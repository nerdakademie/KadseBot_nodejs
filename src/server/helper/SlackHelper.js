const SlackBot = require('slackbots');
const config = require('config');
const StringHelper = require('./StringHelper');
const bot = new SlackBot({
  token: config.get('slack_bot_token'),
  name: 'KadseBot'
});

module.exports = (() => {
  'use strict';

  function sendMessageFromTelegram(telegramJSON) {
    const {text} = telegramJSON.message;
    const {first_name, last_name, username} = telegramJSON.message.from;

    let name = '';

    if (!StringHelper.isNullOrEmptyString(first_name) && !StringHelper.isNullOrEmptyString(last_name)) {
      name = `${first_name} ${last_name}`;
    } else if(!StringHelper.isNullOrEmptyString(first_name)) {
      name = first_name
    } else if (!StringHelper.isNullOrEmptyString(username)) {
      name = username
    } else {
      name = 'unknown'
    }

    bot.postMessageToChannel('general', `${name}: ${text}`);
  }

  return {
    sendMessageFromTelegram
  };
})();
