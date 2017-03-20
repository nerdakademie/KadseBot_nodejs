'use strict';
const echo = require('./modules/echo');
const error = require('./modules/error');
const debug = require('./modules/debug');
const decide = require('./modules/decide');
const roulette = require('./modules/roulette');

module.exports = class FunctionController {

  constructor(){
    this.moduleList = [new echo(), new debug(), new decide(), new roulette()];
    this.error = new error();
    this.botName = 'KadseBot'
  }

  contains(origstring, compare) {
    return origstring.indexOf(compare) > -1;
  }

  getCommand(inputData) {
    let command = inputData.toLowerCase();
    if (this.contains(inputData, ' ')) {
      command = command.split(' ')[0];
    }
    if (this.contains(command, '@'.concat(this.botName.toLowerCase()))) {
      return command.replace('@'.concat(this.botName.toLowerCase()), '');
    } else if (this.contains(command, ' @'.concat(this.botName.toLowerCase()))) {
      return command.replace(' @'.concat(this.botName.toLowerCase()), '');
    }
    return command;
  }

  getParams(inputData) {
    const params = inputData.split(' ');
    if (this.contains(inputData, ' @'.concat(this.botName))) {
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

    const payload= {};
    payload.original = JsonData;
    if(commandSource === 0) {
      payload.parameters = this.getParams(JsonData.text);
    } else if(commandSource === 1) {
      payload.parameters = this.getParams(JsonData.message.text);
    }

    for(const module of this.moduleList) {
      if(`/${module.getCommand()}` === command) {
        return module.executeCommand(commandSource,payload);
      }
    }
    return this.error.executeCommand(commandSource,payload);
  }
};