const User = require('mongoose').model('User');

module.exports = (() => {

  function login(request, response) {
    console.log(request.body);
    if(request.body.username == null || request.body.password == null) {
      response.json({success: false});
      response.end();
    } else {
      User.find({nak_user: request.body.username}).limit( 1 ).exec((error, users) => {
        users.map(function(user) {
          if(user == []) {
            response.json({success: false});
          }
          else if (error) {
            response.json({success: false});
          }
          else if (user.nak_pass === request.body.password) {
            request.session.user = user.nak_user;
            response.json({success: true});
          } else {
            response.json({success: false});
          }
        });
      });
    }
  }

  return {
    login
  };
})();
