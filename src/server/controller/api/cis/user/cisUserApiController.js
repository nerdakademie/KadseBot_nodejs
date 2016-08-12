const cisUserHelper = require('../../../../helper/cis/user/cisUserHelper');

module.exports = (() => {

  function getNAKAuthCookie(request,response){
    if (request.body.username === null || request.body.password === null) {
      response.status(404).json({success: false, message: "error wrong data specified"});
      response.end();
    } else {
      cisUserHelper.getNAKAuthCookie(request.body.username, request.body.password, function (result){
        if (result === false) {
          response.status(200).json({fe_typo_user:"",message: "error: could not find cookie"});
          response.end();
        } else {
          response.json({cookie:result});
        }
      });
    }
  }

  function isNAKUser(request,response){
    if (request.body.username === null || request.body.password === null) {
      response.status(404).json({nakuser: false, message: 'error wrong data specified'});
      response.end();
    } else {
      cisUserHelper.isNAKUser(request.body.username,request.body.password,function (result){
        if (result) {
          response.status(200).json({nakuser:true});
        } else {
          response.status(200).json({nakuser:false});
        }
      });
    }
  }

  function getUserDetails(request, response) {
    if (request.body.username === null || request.body.password === null) {
      response.status(404).json({success: false,message: 'error wrong data specified'});
      response.end();
    } else {
      cisUserHelper.getNAKUserDetails(request.body.username, request.body.password, function(userTable) {
        response.json(userTable);
      });
    }
  }

  function getApiKey(request, response){
    if (request.body.username === null || request.body.password === null) {
      response.status(404).json({success: false});
      response.end();
    } else {
      cisUserHelper.getApiKey(request.body.username, request.body.password, function(apiKey) {
        if (apiKey === false) {
          response.json({sucess: false});
        } else {
          response.json(apiKey);
        }
      });
    }
  }

  return {
    getNAKAuthCookie,
    getUserDetails,
    getApiKey,
    isNAKUser
  };
})();
