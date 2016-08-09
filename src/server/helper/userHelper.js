const User = require('mongoose').model('User');
const bcrypt = require('bcrypt');
const jquery = require('jquery');
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

  function isPasswordCorrect(user,password,callback) {
    bcrypt.compare(password, user.nak_pass, function(err, res) {
      if(err){
        callback(false);
      }else{
        callback(res);
      }
    });
  }

  function isNAKUser(username,password){
    jquery.post("https://cis.nordakademie.de/startseite/?no_cache=1",{logintype: "login", pid: 0,user: username,pass: password},function (data){
      console.log(data.headers.cookie);
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
    isPasswordCorrect,
    isNAKUser,
    registerUser
  };
})();
