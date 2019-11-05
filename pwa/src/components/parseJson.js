
const getUsers = (json) => {
    return json.filter(sheet => sheet.sheetName !== "Testergebnisse")
}

const getOverview = (json) => {
    return json.filter(sheet => sheet.sheetName === "Testergebnisse")
}

const parse = {
    getOverview,
    getUsers,
}

export default parse