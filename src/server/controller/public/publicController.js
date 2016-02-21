const config = require('config');
const debug = require('debug');
const User = require('mongoose').model('User');

module.exports = (() => {
  function index(request, response) {
    const sess = request.session;
    console.log(sess);
    if (sess.user == null) {
      response.render('loginForm', {
        title: 'KadseBOT Login',
        rootPath: config.rootPath,
        user: sess.user
      });
    } else {
      response.render('index', {
        title: 'KadseBOT',
        rootPath: config.rootPath
      });
    }
  }

  return {
    index
  };
})();
