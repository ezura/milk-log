class DataSource {
    #spreadSheetPage

    constructor(spreadSheetId) {
        this.#spreadSheetPage = SpreadsheetApp.openById(spreadSheetId)
    }

    #pageNameFor(date) {
        return `${date.getFullYear()}/${date.getMonth()}`
    }

    #getSheetFor(date) {
        return this.#spreadSheetPage.getSheetByName(this.#pageNameFor(date))
    }

    #getRangeFor(date) {
        const sheet = this.#getSheetFor(date)
        if(!sheet) { return null }
        return sheet.getRange(`A${date.getDate()}`)
    }

    getValueOf(date) {
        const sheet = this.#getSheetFor(date)
        if(!sheet) { return 0 }
        return this.#getRangeFor(date).getDisplayValue() || 0
    }

    setValue(date, value) {
        const sheet = this.#getSheetFor(date) ?? this.#spreadSheetPage.insertSheet(this.#pageNameFor(date));
        // todo: error handling in case the sheet is null
        this.#getRangeFor(date).setValue(value)
    }
}
