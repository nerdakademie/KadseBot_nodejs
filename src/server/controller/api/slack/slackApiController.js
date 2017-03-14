const TelegramHelper = require('../../../helper/TelegramHelper');
const StringHelper = require('../../../helper/StringHelper');
const config = require('config');
module.exports = (() => {
  function sendMessage(request, response) {
    const json = request.body;
    TelegramHelper.sendMessage(json.chatid, json.message);
    response.end();
  }

  function webHook(request, response) {
    const {token, user_name, text} = request.body;

    if(StringHelper.isNullOrEmptyString(token) ||
        StringHelper.isNullOrEmptyString(user_name) ||
        StringHelper.isNullOrEmptyString(text)) {
      return response.status(400).json({success: false,
        error: {text: 'Wrong json supplied'}});
    }

    if(token !== config.get('slack_webhook_token')) {
      return response.status(400).json({success: false,
        error: {text: 'Wrong webhook token'}});
    }

    TelegramHelper.sendMessage(config.get('telegram_chat_id'),`${user_name}: ${text}`);

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
