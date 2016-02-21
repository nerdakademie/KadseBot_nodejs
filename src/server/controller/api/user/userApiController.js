const User = require('mongoose').model('User');

module.exports = (() => {

  function register(request, response) {
    const user = new User(request.body);
    User.count({nak_user: request.body.nak_user}, function(err, count) {
      if (count > 0) {
        response.json({status: 'failed'});
      } else {
        // user.nak_pass = new Buffer(user.nak_pass).toString('base64');
        user.save((error) => {
          if (error) {
            response.json({status: 'error'});
          } else {
            response.json({status: 'success'});
          }
        });
      }
    });
  }

  return {
    register
  };
})();
