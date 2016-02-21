const User = require('mongoose').model('User');

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

  return {
    getUserBySession,
    getUserByName
  };
})();
