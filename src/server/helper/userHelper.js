const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = (() => {
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

  function isPasswordCorrect(user,password) {
    bcrypt.compare(password, user.nak_pass, function(err, res) {
      if(err){
        return false;
      }else{
        return res;
      }
    });
  }

  function registerUser(user,callback){
    console.log(user);
    User.count({nak_user: user.nak_user}, function(err, count) {
      if(err){
        callback('failed');
      }else{
        if (count > 0) {
          callback('failed');
        } else {
          user.nak_pass = getHashFromPassword(user.nak_pass);
          console.log(user.nak_pass)
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
    isPasswordCorrect,
    registerUser
  };
})();
