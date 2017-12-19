const TelegramHelper = require('../../../helper/TelegramHelper');
const FunctionController = require('../../../function/FunctionController');
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
    const {text} = json.message;
    const {id}  = json.message.chat;
    if(!StringHelper.isNullOrEmptyString(text)) {
    if(text.substring(0,1) === '/') {
      new FunctionController().executeCommand(1, json);
      //TelegramHelper.executeCommand(json);
    } else {
      if(id === config.get('telegram_chat_id')) {
        SlackHelper.sendMessageFromTelegram(json);
      }
    }
    }
    //TODO:make other types work (Stickers, Photos, Files)
    response.end();
  }
  return {
    sendMessage,
    webHook
  };
})();
