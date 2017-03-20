'use strict';
const Module = require('../Module');

module.exports = class debug extends Module {

  constructor(){
    super();
  }

  getCommand() {
    return 'decide';
  }

  executeCommand(commandSource, payload){
    if (payload.parameters.length > 0) {
      return super.sendMessage(commandSource, payload.parameters[this.generateRandomNumber(0, payload.parameters.length)], payload.original);
    } else {
      return super.sendMessage(commandSource, 'No options specified', payload.original);
    }
  }

  generateRandomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

};