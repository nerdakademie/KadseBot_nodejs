'use strict';
const Module = require('../Module');

module.exports = class roulette extends Module {

  getCommand() {
    return 'roulette';
  }

  executeCommand(commandSource, payload) {
    if (roulette.generateRandomNumber(1, 5) === 1) {
      return super.sendMessage(commandSource, 'Peng! Du bist Tod. Miau', payload.original);
    }
    return super.sendMessage(commandSource, 'Glück gehabt du Penner', payload.original);
  }

  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * max + min);
  }

};
