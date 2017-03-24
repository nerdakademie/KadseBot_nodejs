'use strict';
const Module = require('../Module');

module.exports = class decide extends Module {

  getCommand() {
    return 'decide';
  }

  executeCommand(commandSource, payload) {
    if (payload.parameters.length > 0) {
      return super.sendMessage(commandSource,
          payload.parameters[decide.generateRandomNumber(0, payload.parameters.length)],
          payload.original);
    }
    return super.sendMessage(commandSource, 'No options specified', payload.original);
  }

  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * max + min);
  }

};
