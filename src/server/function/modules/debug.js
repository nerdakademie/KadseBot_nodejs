'use strict';
const Module = require('../Module');

module.exports = class debug extends Module {

  constructor(){
    super();
  }

  getCommand() {
    return 'debug';
  }

  executeCommand(commandSource, payload){
    super.sendMessage(commandSource, JSON.stringify(payload.original), payload.original);
  }

};