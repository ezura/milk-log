const spreadSheetPage = SpreadsheetApp.openById(spreadSheetId);

function pageNameFor(date) {
    return `${date.getFullYear()}/${date.getMonth()}`
}

function getSheetFor(date) {
    return spreadSheetPage.getSheetByName(pageNameFor(date))
}

function getRangeFor(date) {
    const sheet = getSheetFor(date)
    if(!sheet) { return null }
    return sheet.getRange(`A${date.getDate()}`)
}

function getValueOf(date) {
    const sheet = getSheetFor(date)
    if(!sheet) { return 0 }
    return getRangeFor(date).getDisplayValue() || 0
}

function setValue(date, value) {
    const sheet = getSheetFor(date) ?? spreadSheetPage.insertSheet(pageNameFor(date));
    // todo: error handling in case the sheet is null
    getRangeFor(date).setValue(value)
}
