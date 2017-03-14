const TelegramHelper = require('../../../helper/TelegramHelper');
const SlackHelper = require('../../../helper/SlackHelper');
const StringHelper = require('../../../helper/StringHelper');
const config = require('config');
module.exports = (() => {
  function sendMessage(request, response) {
    const json = request.body;
    TelegramHelper.sendMessage(json.chatid, json.message);
    response.end();
  }
  function webHook(request, response) {
    const json = request.body;
    const {text} = request.body.message;
    const {id}  = request.body.message.chat;
    if(StringHelper.isNullOrEmptyString(text)) {
      return response.status(400).json({success: false,
        error: {text: 'No message text supplied'}});
    }
    if(text.substring(0,1) === '/') {
      TelegramHelper.executeCommand(json);
    } else {
      if(id === config.get('telegram_chat_id')) {
        SlackHelper.sendMessageFromTelegram(request.body);
      }
    }
    response.end();
  }
  return {
    sendMessage,
    webHook
  };
})();
