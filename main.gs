const LINE_ENDPOINT = "https://api.line.me/v2/bot/message/reply"

function doPost(arg) {
    const json = JSON.parse(arg.postData.contents)
    const replyToken = json.events[0].replyToken
    const userMessage = json.events[0].message.text

    const dataSource = new DataSource(spreadSheetId)
    const now = new Date()
    const currentMilkMount = dataSource.getValueOf(now)
    const newValue = parseInt(userMessage) + currentMilkMount
    dataSource.setValue(now, newValue)

    const reply_message = `total: ${newValue}ml\nhttps://docs.google.com/spreadsheets/d/${spreadSheetId}`
    const message = { "type": "text", "text": reply_message }
    UrlFetchApp.fetch(LINE_ENDPOINT, {
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + channelAccessToken,
        },
        'method': 'post',
        'payload': JSON.stringify({
            'replyToken': replyToken,
            'messages': [message],
            'notificationDisabled': false,
        }),
    });
    return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

function doGet(arg) {
}
