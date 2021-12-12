// todo: use # syntax for private members after GAS supports it.
class DataSource {
    constructor(spreadSheetId) {
        this._spreadSheetPage = SpreadsheetApp.openById(spreadSheetId)
    }

    _pageNameFor(date) {
        return `${date.getFullYear()}/${date.getMonth()}`
    }

    _getSheetFor(date) {
        return this._spreadSheetPage.getSheetByName(this._pageNameFor(date))
    }

    _getRangeFor(date) {
        const sheet = this._getSheetFor(date)
        if(!sheet) { return null }
        return sheet.getRange(`A${date.getDate()}`)
    }

    getValueOf(date) {
        const sheet = this._getSheetFor(date)
        if(!sheet) { return 0 }
        return this._getRangeFor(date).getDisplayValue() || 0
    }

    setValue(date, value) {
        const sheet = this._getSheetFor(date) ?? this._spreadSheetPage.insertSheet(this._pageNameFor(date));
        // todo: error handling in case the sheet is null
        this._getRangeFor(date).setValue(value)
    }
}
