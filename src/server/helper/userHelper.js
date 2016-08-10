const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');
const request = require('request');
const saltRounds = 12;

module.exports = (() => {

  function parseSetCookies(cookieArray){
    var list ={};
    cookieArray.forEach(function (cookieItem){
      cookieItem && cookieOtem.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
      });
    });
    return list;
  }

  function getUserBySession(request, callback) {
    User.findOne({nak_user: request.session.user}).exec((error, user) => {
        callback( user );
    });
  }

  function getUserByName(name, callback) {
    User.findOne({nak_user: name}).exec((error, user) => {
      callback( user );
    });
  }

  function getHashFromPassword(password) {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if(err){
        return "";
      }else{
        return hash;
      }
    });
  }

  function getNAKAuthCookie(username,password,callback){
    request.post({url:'https://cis.nordakademie.de/startseite/?no_cache=1', form: {logintype: "login", pid: 0,user: username,pass: password}}, function(err,httpResponse,body){
      if(httpResponse.statusCode == 404){
        callback(false);
      }else if(httpResponse.statusCode == 303){
        //We are being redirected
        const cookies = httpResponse.headers["set-cookie"];
        if(cookies == null){
          callback(false);
        }else{
          const cookieList = parseSetCookies(cookies);
          if(cookieList.fe_typo_user == null){
            callback(false);
          }else{
            callback(cookieList.fe_typo_user);
          }
        }
      }
    });
  }

  function isPasswordCorrect(user,password,callback) {
    bcrypt.compare(password, user.nak_pass, function(err, res) {
      if(err){
        callback(false);
      }else{
        callback(res);
      }
    });
  }

  function isNAKUser(username,password,callback){
    request.post({url:'https://cis.nordakademie.de/startseite/?no_cache=1', form: {logintype: "login", pid: 0,user: username,pass: password}}, function(err,httpResponse,body){
      if(httpResponse.statusCode == 404){
        callback(false);
      }else if(httpResponse.statusCode == 303){
        //We are being redirected
        callback(true);
      }
    });
  }

  function registerUser(username,password,callback){
    User.count({nak_user: username}, function(err, count) {
      if(err){
        callback('error: database error');
      }else{
        if (count > 0) {
          callback('error: user already exists');
        } else {
          const user = new User({nak_user: username, nak_pass: bcrypt.hashSync(password,saltRounds)});
          user.save((error) => {
            if (error) {
              callback('error: data does not match schema');
            } else {
              callback('success');
            }
          });
        }
      }
    });
  }

  return {
    getUserBySession,
    getUserByName,
    getHashFromPassword,
    getNAKAuthCookie,
    isPasswordCorrect,
    isNAKUser,
    registerUser
  };
})();
