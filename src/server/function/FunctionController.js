'use strict';
const Echo = require('./modules/echo');
const Error = require('./modules/error');
const Debug = require('./modules/debug');
const Decide = require('./modules/decide');
const Roulette = require('./modules/roulette');
const Engage = require('./modules/engage');

module.exports = class FunctionController {

  constructor() {
    this.moduleList = [new Echo(), new Debug(), new Decide(), new Roulette(), new Engage()];
    this.error = new Error();
    this.botName = 'KadseBot';
  }

  static contains(origstring, compare) {
    return origstring.indexOf(compare) > -1;
  }

  getCommand(inputData) {
    let command = inputData.toLowerCase();
    if (FunctionController.contains(inputData, ' ')) {
      command = command.split(' ')[0];
    }
    if (FunctionController.contains(command, '@'.concat(this.botName.toLowerCase()))) {
      return command.replace('@'.concat(this.botName.toLowerCase()), '');
    } else if (FunctionController.contains(command, ' @'.concat(this.botName.toLowerCase()))) {
      return command.replace(' @'.concat(this.botName.toLowerCase()), '');
    }
    return command;
  }

  getParams(inputData) {
    const params = inputData.split(' ');
    if (FunctionController.contains(inputData, ' @'.concat(this.botName))) {
      return params.slice(2);
    }
    return params.slice(1);
  }

  executeCommand(commandSource, JsonData) {
    //   incrementUsage(JsonData);
    let command;
    if (typeof JsonData.message.text === 'undefined') {
      command = 'undefined';
    } else {
      command = this.getCommand(JsonData.message.text);
    }

    const payload = {};
    payload.original = JsonData;
    if (commandSource === 0) {
      payload.parameters = this.getParams(JsonData.text);
    } else if (commandSource === 1) {
      payload.parameters = this.getParams(JsonData.message.text);
    }

    for (const module of this.moduleList) {
      if (`/${module.getCommand()}` === command) {
        return module.executeCommand(commandSource, payload);
      }
    }
    return this.error.executeCommand(commandSource, payload);
  }
};
