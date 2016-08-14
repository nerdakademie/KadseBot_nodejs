const request = require('request');
const cheerio = require('cheerio');
const utils = require('../../utils');
const cisUserAuthHelper = require('./auth/cisUserAuthHelper');

module.exports = (() => {
  'use strict';

  function getNAKUserDetails(apikey, callback) {
    cisUserAuthHelper.getValidTypoCookieByApiKey(apikey,function(typoCookie) {
      const ar = request.jar();
      const cookie = request.cookie('fe_typo_user=' + typoCookie);
      const url = 'https://cis.nordakademie.de/nacommunity/mein-profil/?no_cache=1';
      ar.setCookie(cookie, url);
      request.get({url: url, jar: ar}, function (err, httpContent, body) {
        const $ = cheerio.load(body);
        console.log(httpContent);
        callback(utils.parseTable($, 'form table tr'));
      });
    });
  }

  function isNAKUser(username, password, callback) {
    request.post({
      url: 'https://cis.nordakademie.de/startseite/?no_cache=1',
      form: {logintype: "login", pid: 0, user: username, pass: password}
    }, function (err, httpResponse, body) {
      if (httpResponse.statusCode === 404) {
        callback(false);
      } else if (httpResponse.statusCode === 303) {
        // We are being redirected
        callback(true);
      }
    });
  }

  return {
    getNAKUserDetails,
    isNAKUser
  };
})();
