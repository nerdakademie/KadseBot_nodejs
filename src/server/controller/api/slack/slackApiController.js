const TelegramHelper = require('../../../helper/TelegramHelper');
const StringHelper = require('../../../helper/StringHelper');
module.exports = (() => {
  function sendMessage(request, response) {
    const json = request.body;
    TelegramHelper.sendMessage(json.chatid, json.message);
    response.end();
  }
  function webHook(request, response) {
    console.log(request.body);
    /*const json = request.body;
    const {text} = request.body.message;
    if(StringHelper.isNullOrEmptyString(text)) {
      return response.status(400).json({success: false,
        error: {text: 'No message text supplied'}});
    }
    if(text.substring(0,1) === '/') {
      TelegramHelper.executeCommand(json);
    } else {

    }*/
    response.end();
  }
  return {
    sendMessage,
    webHook
  };
})();
