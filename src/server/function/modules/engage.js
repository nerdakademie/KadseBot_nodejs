'use strict';
const Module = require('../Module');

module.exports = class engage extends Module {

  getCommand() {
    return 'engage';
  }

  executeCommand(commandSource, payload) {
    let counter = 0;
    const engagingTask = setInterval(() => {
      super.sendMessage(commandSource, payload.parameters.join(' '), payload.original);
      counter++;
      if (counter === 5) {
        clearInterval(engagingTask);
      }
    }, 1000);
  }

};
