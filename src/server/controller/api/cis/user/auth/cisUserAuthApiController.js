const cisUserAuthHelper = require('../../../../../helper/cis/user/auth/cisUserAuthHelper');

module.exports = (() => {
  function getApiKey(request, response) {
    if (request.query.username === null || request.query.password === null) {
      response.status(404).json({success: false});
      response.end();
    } else {
      cisUserAuthHelper.getApiKey(request.query.username, request.query.password, function(apiKey) {
        if (apiKey === false) {
          response.json({sucess: false});
        } else {
          response.json(apiKey);
        }
      });
    }
  }

  return {
    getApiKey
  };
})();
