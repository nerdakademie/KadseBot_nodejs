const User = require('mongoose').model('User');
const $ = require('jquery');
const userHelper = require('../../../helper/userHelper');
const isJSON = require('is-json');

module.exports = (() => {

  function register(request, response) {
    if(isJSON((request.body)){}
      const user = new User({nak_user: request.body.username, nak_pass: request.body.password});
      //TODO check if user is actually a nak user
      userHelper.registerUser(user,function(message){
        response.json({status: message});
      });
    }else{
      response.json({status: 'error: expected json'});
    }
  }

  return {
    register
  };
})();
