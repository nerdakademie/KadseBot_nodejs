const Statistic = require('mongoose').model('Statistic');
const TelegramBot = require('node-telegram-bot-api');
const telegramBotToken = '120945382:AAGrADFVuyEIxJJO3KRfdSz7EaoCNtcwwAw';
const bot = new TelegramBot(telegramBotToken);

module.exports = (() => {
  'use strict';

  const botName = 'KadseBot';

  function contains(origstring, compare){
    return origstring.indexOf(compare) > -1;
  }

  function getCommand(inputData) {
    const split = inputData.split(' ');
    let command = split[0];
    if (contains(command, '@'.concat(botName))) {
      return command.replace('@'.concat(botName), '');
    } else if (contains(command, ' @'.concat(botName))) {
      return command.replace(' @'.concat(botName), '');
    }
    return command;
  }

  function getParams(inputData) {
    console.log(inputData);
    const params = inputData.split(' ');
    console.log(params.slice(1));
    if (contains(inputData, ' @'.concat(botName))) {
      return params.slice(2);
    } else {
      return params.slice(1);
    }
  }

  function executeCommand(JsonData) {
 //   incrementUsage(JsonData);
    const command = getCommand(JsonData.message.text);
    switch (command) {
      case '/echo':
        bot.sendMessage(JsonData.message.chat.id, getParams(JsonData.message.text).join(' '));
        break;
      case '/debug':
        bot.sendMessage(JsonData.message.chat.id, JSON.stringify(JsonData.message.text));
        break;
      case '/decide':
        bot.sendMessage(JsonData.message.chat.id, decide(getParams(JsonData.message.text)));
        break;
      case '/ohkadsewasessenwirheute':
        bot.sendMessage(JsonData.message.chat.id, decide(['Mensa', 'Fresh', 'Smileys', 'Penny', 'Dinos', 'Hack']));
        break;

      default:
        bot.sendMessage(JsonData.message.chat.id, 'Kadse verwirrt. Kadse kennt nicht');
        break;
    }
  }

  function decide(Params) {
    if (Params.size > 0) {
      return Params[generateRandomNumber(0, Params.size)];
    } else {
      return errorMessage('No options specified');
    }
  }

  function errorMessage(ErrorMessage) {
    return 'Error: '.concat(ErrorMessage);
  }

  function generateRandomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

  function executeTest() {
    bot.sendMessage(49897717, 'haaaack');
  }

  function sendMessage(chatID, Message) {
    bot.sendMessage(chatID, Message);
  }

  // Timeout in milliseconds
  function waitForMessage(userID, callback) {
    bot.on('message', function(msg) {
      const userId = msg.from.id;
      if (userId.equals(userID)) {
        callback(msg);
      }
    });
  }

  function incrementUsage(inputData){
      Statistic.findOne({chat_id: inputdata.message.chat.id}, function(err, statisticEntry) {
          if (!err) {
            if (!statisticEntry) {
              statisticEntry = new Statistic();
              statisticEntry.chat_id = inputData.message.chat.id;
              statisticEntry.used = 0;
            }
            statisticEntry.used = statisticEntry.used + 1;
            statisticEntry.save(function(err) {
              if (!err) {
                // console.log("contact " + statisticEntry.phone + " created at " + statisticEntry.createdAt + " updated at " + statisticEntry.updatedAt);
              }
              else {
               // console.log("Error: could not save contact " + statisticEntry.phone);
              }
            });
          }
      });
  }

  return {
    executeCommand,
    executeTest,
    sendMessage,
    waitForMessage
  };
})();
