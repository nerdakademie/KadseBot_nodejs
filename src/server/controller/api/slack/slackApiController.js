const TelegramHelper = require('../../../helper/TelegramHelper');
const StringHelper = require('../../../helper/StringHelper');
const config = require('config');
module.exports = (() => {

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

    if(user_name !== 'kadsebot') {
      TelegramHelper.sendMessage(config.get('telegram_chat_id'), `${user_name}: ${text}`);
    }
    response.end();
  }
  return {
    webHook
  };
})();
