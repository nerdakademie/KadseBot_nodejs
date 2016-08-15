const request = require('request');
const cheerio = require('cheerio');
const utils = require('../../utils');
const cisUserAuthHelper = require('./auth/cisUserAuthHelper');

module.exports = (() => {
  'use strict';

  function getUserDetails(apikey, callback) {
    cisUserAuthHelper.getValidTypoCookieByApiKey(apikey, function(typoCookie) {
      const ar = request.jar();
      const cookie = request.cookie('fe_typo_user=' + typoCookie);
      const url = 'https://cis.nordakademie.de/nacommunity/mein-profil/?no_cache=1';
      ar.setCookie(cookie, url);
      request.get({url: url, jar: ar}, function (err, httpContent, body) {
        const $ = cheerio.load(body);
        callback(utils.parseTableDetails($, 'form table tr'));
      });
    });
  }

  function getGrades(apikey, callback){
    cisUserAuthHelper.getValidTypoCookieByApiKey(apikey, function(typoCookie) {
      const ar = request.jar();
      const cookie = request.cookie('fe_typo_user=' + typoCookie);
      const url = 'https://cis.nordakademie.de/pruefungsamt/pruefungsergebnisse/?no_cache=1';
      ar.setCookie(cookie, url);
      request.get({url: url, jar: ar}, function (err, httpContent, body) {
        const $ = cheerio.load(body);
        callback(utils.parseTableGrades($, '#curricular table tr', ['modulenumber', 'description', 'exam_date', 'entry_date', 'grade', 'credits'], 6));
      });
    });
  }

  return {
    getUserDetails,
    getGrades
  };
})();
