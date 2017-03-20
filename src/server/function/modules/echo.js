'use strict';

import Module from '../Module';

module.exports = class echo extends Module {

  constructor(){
    super();
  }

  getCommand() {
    return 'echo';
  }

  executeCommand(commandSource, payload){
    Module.sendMessage(commandSource, payload.text, payload.original);
  }

};