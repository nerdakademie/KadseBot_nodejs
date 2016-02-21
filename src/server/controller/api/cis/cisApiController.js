const User = require('mongoose').model('User');
const Userhelper = require('../../../helper/userHelper');

module.exports = (() => {

  const grades_url = "https://cis.nordakademie.de/pruefungsamt/pruefungsergebnisse/?no_cache=1";


  function getGrades(request, response) {
    Userhelper.getUserBySession(request, function(user) {
      user.nak_user;
    });
  }

  function login(request, response) {
    console.log(request.body);
    if (request.body.username == null || request.body.password == null) {
      response.json({success: false});
      response.end();
    } else {
      User.find({nak_user: request.body.username}).limit( 1 ).exec((error, users) => {
        users.map(function(user) {
          if (user == []) {
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

  function logout(request, response) {
    request.session.regenerate(function(err) {
      if (err) {
        response.json({success: false});
      } else {
        response.json({success: true});
      }
    });
  }
  return {
    login,
    logout
  };
})();
