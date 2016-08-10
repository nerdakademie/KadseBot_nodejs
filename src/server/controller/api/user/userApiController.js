const User = require('mongoose').model('User');
const $ = require('jquery');
const userHelper = require('../../../helper/userHelper');

module.exports = (() => {

  function register(request, response) {
    if (request.body.username == null || request.body.password == null) {
      response.status(404).json({message: "error wrong data specified"});
      response.end();
    }else{
      userHelper.isNAKUser(request.body.username,request.body.password,function(result){
        if(result){
          userHelper.registerUser(request.body.username, request.body.password,function(message){
              response.status(200).json({message: message});
          });
        }else{
          response.status(200).json({message: "no NAK user or wrong login data"});
        }
      });
    }
  }

  function getNAKAuthCookie(request,response){
    if (request.body.username == null || request.body.password == null) {
      response.status(404).json({nakuser:false,message: "error wrong data specified"});
      response.end();
    }else{
      userHelper.getNAKAuthCookie(request.body.username,request.body.password,function (result){
        if(result === false){
          response.status(200).json({cookie:"",message: "error: could not find cookie"});
          response.end();
        }else{
          response.json({cookie:result});
        }
      });
    }
  }

  function isNAKUser(request,response){
    if (request.body.username == null || request.body.password == null) {
      response.status(404).json({nakuser:false,message: "error wrong data specified"});
      response.end();
    }else{
      userHelper.isNAKUser(request.body.username,request.body.password,function (result){
        if(result){
          response.status(200).json({nakuser:true});
        }else{
          response.status(200).json({nakuser:false});
        }
      });
    }
  }

  return {
    register,
    getNAKAuthCookie,
    isNAKUser
  };
})();
