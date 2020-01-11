
//get users
const getUsers = (json) => {
    let users  =  json.tst_active[0].row.map(usr => usr.$)
    let usersId = []
    //turn active_id into key
    //active_id : {usr.data}
    users.forEach(usr => {
        usersId[usr.active_id] = usr
        usersId[usr.active_id]["passes"] = []
        usersId[usr.active_id]["results"] = []
        usersId[usr.active_id]["tests"] = []

    });

    //add test passes to usr
    json.tst_pass_result[0].row.forEach(pass => {
        usersId[pass.$.active_fi]["passes"].push(pass.$)
    });
    
    //add results to usr
    json.tst_result_cache[0].row.forEach(result => {
        usersId[result.$.active_fi]["results"].push(result.$)
    });

    //add tst_test_result to user 
    //this is in order to analyze when the user first and last looked at the test
    json.tst_test_result[0].row.forEach(result => {
        usersId[result.$.active_fi]["tests"].push(result.$)
    });
    return usersId
}

//sort questions and times. This is build on top of the tst_result object. 
//this means only data when a test is finished will be added
const getQuestions = (json, qti) => {
    let information = getInformation(qti)
    let questions  =  json.tst_test_result[0].row.map(q => q.$)
    let users  =  json.tst_active[0].row.map(usr => usr.$)
    let questionsId = []
    questions.forEach(q => {
        questionsId[q.question_fi] = q
    });
    //array with quesions per Pass
    let questionPass = []
    questions.forEach(q => {
        q["realPoints"] = q.points
        if (!questionPass.hasOwnProperty(q.active_fi+q.pass)) {
            questionPass[q.active_fi+q.pass] = []
        }
        //somehow there are the same question with the same timestamp in a pass
        //so we need to check if the questions already exists before adding it
        const found = questionPass[q.active_fi+q.pass].some(el => el.question_fi === q.question_fi);
        if(!found){
            questionPass[q.active_fi+q.pass].push(q)
        }
    });

    //delta per question
    let questionTime = []
    //i dont want to know the O(n) for this
    questionPass.forEach(passes => {
        let passStartTime = passes[0].tstamp
        for (let i = 0; i < passes.length; i++) {
            if (!questionTime.hasOwnProperty(passes[i].question_fi)) {
                questionTime[passes[i].question_fi] = []
            }
            if(passes[i+1]===undefined){
                //next question is undefined, so we cant calc the answer time 
                questionTime[passes[i].question_fi].push(0)
                passes[i]["time"] = 0
            }else{
                questionTime[passes[i].question_fi].push(passes[i+1].tstamp-passStartTime)
                passes[i]["time"] = passes[i+1].tstamp-passStartTime
            }
            passStartTime = passes[i].tstamp
        }
    });

    //calculate time per pass
    let passTime = []
    for (const [id, passes] of Object.entries(questionPass)) {
        passTime[id]= passes[passes.length-1].tstamp-passes[0].tstamp
    }



    
    //add average and time to question
    for (const [id, times] of Object.entries(questionTime)) {
        if(questionsId[id] !== undefined){
            questionsId[id]["times"]  = times
            let nonZeroTimes = times.filter(time => time>0)
            questionsId[id]["average"] = (nonZeroTimes.reduce((a,b) => a + Number(b), 0)/nonZeroTimes.length) || 0
            questionsId[id]["timeString"] = times.join(", ")
            questionsId[id]["title"] = information.titles[id]
        }
    }
    //add user to questionPass
    for (const [, passes] of Object.entries(questionPass)) {
        passes.forEach(pass=>{
            
            let user = users.filter(user => {
                return user.active_id === pass.active_fi
                })[0]
            pass["user"] = user
            pass["timeArray"] = questionTime[pass.question_fi]
            let nonZeroTimes = pass["timeArray"].filter(time => time>0)
            pass["questionAverage"] = (nonZeroTimes.reduce((a,b) => a + Number(b), 0)/nonZeroTimes.length) || 0
            pass["title"] = information.titles[pass.question_fi]
        })
    }
    
    return {questionsId: questionsId, questionPass:questionPass, passTime:passTime,title:information.title, testID:information.testID, times: information.times}

}

//get test tile, questions and times
const getInformation = (qti) => {
    let questionTitles = []
    qti.section[0].item.forEach(item => {
        let question_ID = item.$.ident.split("_").pop()
        questionTitles[question_ID] = item.$.title

    });
    //get Times

    let times = []
    let startTime = undefined
    let endingTime = undefined
    let activationStartTime = undefined
    let activationEndTime = undefined

    qti.qtimetadata[0].qtimetadatafield.forEach(entry=>{
        let label = entry.fieldlabel[0]
        let value = entry.fieldentry[0]

        if (label == "starting_time"){
            startTime = value
        }
        if (label == "ending_time"){
            endingTime = value
        }
        if (label == "activation_start_time"){
            activationStartTime = value
        }
        if (label == "activation_end_time"){
            activationEndTime = value
        }
    })
    times["starting_time"] = startTime || "not specified"
    times["ending_time"] = endingTime || "not specified"
    times["activation_start_time"] =  activationStartTime || "not specified"
    times["activation_end_time"] = activationEndTime || "not specified"

    return {title:qti.$.title, titles:questionTitles,testID:qti.$.ident, times:times }
}

const getData = (json, qti) => {
    //get Testergebnisse sheet
    let users = getUsers(json)
    let questionParams = getQuestions(json,qti)
    let userArray = []
    let questionArray = []
    let fullQuestionArray = []

    //change user back to an array to work easier with it.
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(users)) {
        userArray.push(value)
    }
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(questionParams.questionsId)) {
        questionArray.push(value)
    }
    //adding test times to passes
    userArray.forEach(user => {
        user.passes.forEach(pass => {
            if (questionParams.passTime[pass.active_fi+pass.pass]!==undefined){

                pass["totalTime"]= questionParams.passTime[pass.active_fi+pass.pass]
            }
        });
    });
    //add when a user first and last looked at a test
    userArray.forEach(user => {
        let firstLooked = user.tests.reduce(function(res, obj) {
            return (Number(obj.tstamp) < Number(res.tstamp)) ? obj : res;
        }).tstamp;
        let lastLooked = user.tests.reduce(function(res, obj) {
            return (Number(obj.tstamp) > Number(res.tstamp)) ? obj : res;
        }).tstamp;
        user["lastLooked"] = lastLooked
        user["firstLooked"] = firstLooked
    });
    //open up dictonary into array
    for (const [, passes] of Object.entries(questionParams.questionPass)) {
        passes.forEach(pass=>{
            fullQuestionArray.push(pass)
        })
    }

    const totalTestRuns  =  userArray.reduce((a,b) => a + Number(b.passes.length), 0)
    const uniqueUsers  =  userArray.reduce((a,b) => a + Number(b.results.length), 0)

    return {users: userArray, uniqueUsers:uniqueUsers ,totalTestRuns: totalTestRuns, questions:questionArray,fullQuestions: fullQuestionArray, title:questionParams.title, times:questionParams.times, testID: questionParams.testID}
}
//gets called after test has been analyzed 
const aggregateUserData = (data) => {
   
    // dictonary with users across tests.
    let combinedUsers = []
    data.forEach(test => {
        test.overview.users.forEach(user=>{
            if (!combinedUsers.hasOwnProperty(user.login)) {
                combinedUsers[user.login] = []
            }
            combinedUsers[user.login].push({test:test.overview.title,times:test.overview.times, data:user})
        })

    });
    let users = []
    //convert dictonary back to array to work easier with vue
    // eslint-disable-next-line no-unused-vars
    for (const [key, value] of Object.entries(combinedUsers)) {
        users.push(value)
    }
    return users
}


const parse = {
    getData,
    aggregateUserData,
}

export default parse