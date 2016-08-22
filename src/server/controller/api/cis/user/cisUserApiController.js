const cisUserHelper = require('../../../../helper/cis/user/cisUserHelper');

module.exports = (() => {
  function getNAKAuthCookie(request, response) {
    if (request.body.username === null || request.body.password === null) {
      response.status(404).json({success: false, message: 'error wrong data specified'});
      response.end();
    } else {
      cisUserHelper.getNAKAuthCookie(request.body.username, request.body.password, function (result) {
        if (result === false) {
          response.status(200).json({fe_typo_user: '', message: 'error: could not find cookie'});
          response.end();
        } else {
          response.json({cookie: result});
        }
      });
    }
  }

  function getUserDetails(request, response) {
    if (request.query.userkey === null) {
      response.status(404).json({success: false, message: 'error wrong data specified'});
      response.end();
    } else {
      cisUserHelper.getUserDetails(request.query.userkey, function(userTable) {
        response.json(userTable);
      });
    }
  }

  function getGrades(request, response) {
    if (request.query.userkey === null) {
      response.status(404).json({success: false, message: 'error wrong data specified'});
      response.end();
    } else {
      cisUserHelper.getGrades(request.query.userkey, function(userTable) {
        response.json(userTable);
      });
    }
  }

  function getSeminarsParticipated(request, response) {
    if (request.query.userkey === null) {
      response.status(404).json({success: false, message: 'error wrong data specified'});
      response.end();
    } else {
      cisUserHelper.getSeminarsParticipated(request.query.userkey, function(userTable) {
        response.json(userTable);
      });
    }
  }

  function getAvailableSeminars(request, response) {
    if (request.query.userkey === null) {
      response.status(404).json({success: false, message: 'error wrong data specified'});
      response.end();
    } else {
      cisUserHelper.getSeminars(request.query.userkey, 0, 0, function(userTable) {
        response.json(userTable);
      });
    }
  }

  return {
    getNAKAuthCookie,
    getUserDetails,
    getGrades,
    getSeminarsParticipated,
    getAvailableSeminars
  };
})();
