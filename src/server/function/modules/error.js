'use strict';
const Module = require('../Module');

module.exports = class error extends Module {

  constructor(){
    super();
  }

  getCommand() {
    return '';
  }

  executeCommand(commandSource, payload){
    super.sendMessage(commandSource, 'Kadse verwirrt. Kadse kennt nicht!', payload.original);
  }

};