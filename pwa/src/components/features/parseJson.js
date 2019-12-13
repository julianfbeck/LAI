import XLSX from "xlsx"

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
    });

    //add test passes to usr
    json.tst_pass_result[0].row.forEach(pass => {
        usersId[pass.$.active_fi]["passes"].push(pass.$)
    });
    
    //add results to usr
    json.tst_result_cache[0].row.forEach(result => {
        usersId[result.$.active_fi]["results"].push(result.$)
    });
    return usersId
}

//sort questions and times. This is build on top of the tst_result object. 
//this means only data when a test is finished will be added
const getQuestions = (json, qti) => {
    let questions  =  json.tst_test_result[0].row.map(q => q.$)
    let questionsId = []
    let information = getInformation(qti)

    questions.forEach(q => {
        questionsId[q.question_fi] = q
    });
    //array with quesions per Pass
    let questionPass = []
    questions.forEach(q => {
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
            }else{
                questionTime[passes[i].question_fi].push(passes[i+1].tstamp-passStartTime)
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
    
    return {questionsId: questionsId, passTime:passTime,title:information.title, testID:information.testID}

}

const getInformation = (qti) => {
    let questionTitles = []
    qti.section[0].item.forEach(item => {
        let question_ID = item.$.ident.split("_").pop()
        questionTitles[question_ID] = item.$.title

    });
    return {title:qti.$.title, titles:questionTitles,testID:qti.$.ident }
}

const getData = (json, qti) => {
    //get Testergebnisse sheet
    let users = getUsers(json)
    let questionParams = getQuestions(json,qti)
    let userArray = []
    let questionArray = []

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
    const totalTestRuns  =  userArray.reduce((a,b) => a + Number(b.passes.length), 0)
    const uniqueUsers  =  userArray.reduce((a,b) => a + Number(b.results.length), 0)

    return {users: userArray, uniqueUsers:uniqueUsers ,totalTestRuns: totalTestRuns, questions:questionArray, title:questionParams.title, testID: questionParams.testID}
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
            combinedUsers[user.login].push({test:test.overview.title, data:user})
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

const downloadExcel = (name, data) => {
    let sheet = XLSX.utils.json_to_sheet(data) 
    var wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, sheet, name)
    XLSX.writeFile(wb, `${name}.xlsx`)      
}
const parse = {
    getData,
    aggregateUserData,
    downloadExcel
}

export default parse