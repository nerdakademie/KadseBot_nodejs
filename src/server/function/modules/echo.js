'use strict';
const Module = require('../Module');
module.exports = class echo extends Module {

  getCommand() {
    return 'echo';
  }

  executeCommand(commandSource, payload){
    super.sendMessage(commandSource, payload.parameters.join(' '), payload.original);
  }

};
