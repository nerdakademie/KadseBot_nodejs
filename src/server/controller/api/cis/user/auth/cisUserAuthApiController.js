const cisUserAuthHelper = require('../../../../../helper/cis/user/auth/cisUserAuthHelper');

module.exports = (() => {
  function getApiKey(request, response) {
    if (request.body.username === null || request.body.password === null) {
      response.status(404).json({success: false});
      response.end();
    } else {
      cisUserAuthHelper.getApiKey(request.body.username, request.body.password, function(apiKey) {
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
