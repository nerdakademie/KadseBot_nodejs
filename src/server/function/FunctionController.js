'use strict';
const echo = require('./modules/echo');
const error = require('./modules/error');

module.exports = class FunctionController {

  constructor(){
    this.moduleList = [new echo];
    this.error = new error;
    this.botName = 'KadseBot'
  }

  getCommand(inputData) {
    let command = inputData.toLowerCase();
    if (contains(inputData, ' ')) {
      command = command.split(' ')[0];
    }
    if (contains(command, '@'.concat(this.botName.toLowerCase()))) {
      return command.replace('@'.concat(this.botName.toLowerCase()), '');
    } else if (contains(command, ' @'.concat(this.botName.toLowerCase()))) {
      return command.replace(' @'.concat(this.botName.toLowerCase()), '');
    }
    return command;
  }

  getParams(inputData) {
    const params = inputData.split(' ');
    if (contains(inputData, ' @'.concat(this.botName))) {
      return params.slice(2);
    } else {
      return params.slice(1);
    }
  }

   executeCommand(commandSource,JsonData) {
    //   incrementUsage(JsonData);
    let command;
    if (typeof JsonData.message.text === 'undefined') {
      command = 'undefined';
    } else {
      command = this.getCommand(JsonData.message.text);
    }
    console.log('after getCommand'.concat(command));

    const payload= {};
    payload.original = JsonData;
    payload.parameters = this.getParams(JsonData);

    for(const module in this.moduleList) {
      if(`/${module.getCommand()}` === command) {
        return module.executeCommand(commandSource,payload);
      }
    }
    return this.error.executeCommand(commandSource,payload);
  }
};