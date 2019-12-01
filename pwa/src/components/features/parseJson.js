
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

//sort questions by user and the user pass
const getQuestions = (json) => {
    let questions  =  json.tst_test_result[0].row.map(q => q.$)
    let questionsId = []
    questions.forEach(q => {
        questionsId[q.question_fi] = q
    });
    let questionsTime = []
    questions.forEach(q => {
        questionsTime[q.tstamp] = q
    });
    console.log(questionsTime)
    //array with quesions per Pass

    let questionPass = []
    questions.forEach(q => {
        if (!questionPass.hasOwnProperty(q.active_fi+q.pass)) {
            questionPass[q.active_fi+q.pass] = []
        }
        //somehow there are sometimes the same question with the same timestamp in a pass
        //so we need to check if the questions already exists.
        const found = questionPass[q.active_fi+q.pass].some(el => el.question_fi === q.question_fi);
        
        if(!found){
            questionPass[q.active_fi+q.pass].push(q)
        }
    });
    console.log(questionPass)
    //delta per question
    let questionTime = []
    
    questionPass.forEach(passes => {
        console.log("pass")
        let passStartTime = passes[0].tstamp
        for (let i = 0; i < passes.length; i++) {
            console.log(passes[i].tstamp)
            if (!questionTime.hasOwnProperty(passes[i].question_fi)) {
                questionTime[passes[i].question_fi] = []
            }
            if(passes[i+1]===undefined){
                //next question is undifined, so we dont know the time
                passes[i]
                questionTime[passes[i].question_fi].push(0)
            }else{
                questionTime[passes[i].question_fi].push(passes[i+1].tstamp-passStartTime)
            }
            passStartTime = passes[i].tstamp
        }
    });
    console.log(questionTime)
    return questionsId

}


const getOverview = (json) => {
    //get Testergebnisse sheet
    const data = json.filter(sheet => sheet.sheetName === "Testergebnisse")[0].data
    //remove last collumn
    const overview = data.filter(sheet => sheet["Benutzername"] !== undefined)
    const maxPoints = overview.reduce((a,b) => a + Number(b["Maximal erreichbare Punktezahl"]), 0)
    const totalPoints = overview.reduce((a,b) => a + Number(b["Testergebnis in Punkten"]), 0)
    const totalTestRuns  =  overview.reduce((a,b) => a + Number(b["Durchlauf"]), 0)
    return {maxPoints: maxPoints, totalPoints: totalPoints, totalTestRuns: totalTestRuns}
}
const parse = {
    getOverview,
    getUsers,
    getQuestions,
}

export default parse