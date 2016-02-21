const Statistic = require('mongoose').model('Statistic');
const TelegramBot = require('node-telegram-bot-api');
const telegramBotToken = '120945382:AAGrADFVuyEIxJJO3KRfdSz7EaoCNtcwwAw';
const bot = new TelegramBot(telegramBotToken);

module.exports = (() => {
  'use strict';

  const botName = 'KadseBot';

  function getCommand(inputData) {
    const split = inputData.split(' ');
    let command = split[0];
    if (command.contains('@'.concat(botName))) {
      return command.replace('@'.concat(botName), '');
    } else if (command.contains(' @'.concat(botName))) {
      return command.replace(' @'.concat(botName), '');
    }
    return command;
  }

  function getParams(inputData) {
    const split = inputData.split(' ');
    if (inputData.contains(' @'.concat(botName))) {
      return split.slice(2);
    } else {
      return split.slice(1);
    }
  }

  function executeCommand(JsonData) {
    const parsedJson = JSON.parse(JsonData);
    incrementUsage(parsedJson);
    const command = getCommand(parsedJson.message.text);
    switch (command) {
      case '/echo':
        bot.sendMessage(parsedJson.message.chat.id, getParams(parsedJson).join(' '));
        break;
      case '/debug':
        bot.sendMessage(parsedJson.message.chat.id, JsonData);
        break;
      case '/decide':
        bot.sendMessage(parsedJson.message.chat.id, decide(getParams(parsedJson)));
        break;
      case '/ohkadsewasessenwirheute':
        bot.sendMessage(parsedJson.message.chat.id, decide(['Mensa', 'Fresh', 'Smileys', 'Penny', 'Dinos', 'Hack']));
        break;

      default:
        bot.sendMessage(parsedJson.message.chat.id, 'Kadse verwirrt. Kadse kennt nicht');
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
