const User = require('mongoose').model('User');
const $ = require('jquery');
const userHelper = require('../../../helper/userHelper');

module.exports = (() => {

  function register(request, response) {
    const user = new User({nak_user: request.body.nak_user, nak_pass: request.body.nak_pass});
    //TODO check if user is actually a nak user
    userHelper.registerUser(user,function(message){
      response.json({status: message});
    });
  }

  return {
    register
  };
})();
