const User = require('mongoose').model('User');
const $ = require('jquery');
const userHelper = require('../../../helper/userHelper');

module.exports = (() => {

  function register(request, response) {
    //TODO check if user is actually a nak user
    userHelper.registerUser(request.body.username, request.body.password,function(message){
      response.json({status: message});
    });
  }

  return {
    register
  };
})();
