const User = require('mongoose').model('User');
const $ = require('jquery');
const userHelper = require('../../../helper/userHelper');

module.exports = (() => {

  function register(request, response) {
    const user = new User(request.body);
    //TODO check if user is actually a nak user
    userHelper.registerUser(user,function(message){
      response.json({status: message});
    });
  }

  return {
    register
  };
})();
