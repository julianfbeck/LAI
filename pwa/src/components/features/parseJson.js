
//get users

const getUsers = (json) => {
    return json.tst_active[0].row.map(usr => usr.$)
}

const getPasses = (json) => {
    return json.tst_active[0].row.map(usr => usr.$)
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
    getPasses
}

export default parse