'use strict';
const Module = require('../Module');

module.exports = class debug extends Module {

  constructor(){
    super();
  }

  getCommand() {
    return 'roulette';
  }

  executeCommand(commandSource, payload){
    if(this.generateRandomNumber(1,5)===1){
      return super.sendMessage(commandSource, 'Peng! Du bist Tod. Miau', payload.original);
    }else {
      return super.sendMessage(commandSource, 'Glück gehabt du Penner', payload.original);
    }
  }

  generateRandomNumber(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

};