'use strict';
const TelegramBot = require('node-telegram-bot-api');
const config = require('config');
const telegramBot = new TelegramBot(config.get('telegram_bot_token'));
const SlackBot = require('slackbots');
const slackBot = new SlackBot({
  token: config.get('slack_bot_token'),
  name: 'TelegramBridge'});

module.exports = class Module {


  constructor() {
    if (this.constructor === Module) {
      throw new TypeError("Can not construct abstract class.");
    }
    if (this.getCommand === Module.prototype.getCommand) {
      throw new TypeError("Please implement abstract method getCommand.");
    }
    if (this.executeCommand === Module.prototype.executeCommand) {
      throw new TypeError("Please implement abstract method executeCommand.");
    }
    this.slack = 0;
    this.telegram = 1
  }
  // An abstract method.
  getCommand() {
    throw new TypeError("Do not call abstract method foo from child.");
  }

  /*
  payload: {
   original: untouched JSON Object,
   parameters: Array of Strings
  }
   */

  executeCommand(commandSource, payload) {
    throw new TypeError("Do not call abstract method foo from child.");
  }

  static sendMessage(commandSource, text, originalJSON) {
    if(commandSource === this.telegram) {
      telegramBot.sendMessage(this.getChatID(originalJSON), text);
    } else if(commandSource === this.slack) {
      slackBot.postMessageToChannel('telegram', text ,{icon_url: 'https://raw.githubusercontent.com/telegramdesktop/tdesktop/master/Telegram/Resources/art/icon128.png'});
    }
  }

  getChatID(json) {
    return json.message.chat.id;
  }

};