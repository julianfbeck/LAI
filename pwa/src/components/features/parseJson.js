
//get users

const getUsers = (json) => {
    let users  =  json.tst_active[0].row.map(usr => usr.$)
    let usersId = {}
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

const getQuestions = (json) => {
    console.log(json)
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