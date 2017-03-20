'use strict';

import Module from '../Module';

module.exports = class error extends Module {

  constructor(){
    super();
  }

  getCommand() {
    return '';
  }

  executeCommand(commandSource, payload){
    Module.sendMessage(commandSource, 'Kadse verwirrt. Kadse kennt nicht!', payload.original);
  }

};