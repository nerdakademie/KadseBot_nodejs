'use strict';
const echo = require('./modules/echo');
const error = require('./modules/error');

module.exports = class FunctionController {

  constructor(){
    this.moduleList = [new echo];
    this.error = new error;
  }
  
  private static botName = 'KadseBot';


  private getCommand(inputData) {
    let command = inputData.toLowerCase();
    if (contains(inputData, ' ')) {
      command = command.split(' ')[0];
    }
    if (contains(command, '@'.concat(FunctionController.botName.toLowerCase()))) {
      return command.replace('@'.concat(FunctionController.botName.toLowerCase()), '');
    } else if (contains(command, ' @'.concat(FunctionController.botName.toLowerCase()))) {
      return command.replace(' @'.concat(FunctionController.botName.toLowerCase()), '');
    }
    return command;
  }

  private getParams(inputData) {
    const params = inputData.split(' ');
    if (contains(inputData, ' @'.concat(FunctionController.botName))) {
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
      command = getCommand(JsonData.message.text);
    }
    console.log('after getCommand'.concat(command));

    const payload= {};
    payload.original = JsonData;
    payload.parameters = getParams(JsonData);

    for(const module in this.moduleList) {
      if(`/${module.getCommand()}` === command) {
        return module.executeCommand(commandSource,payload);
      }
    }
    return this.error.executeCommand(commandSource,payload);
  }
};