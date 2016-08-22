const request = require('request');
let cheerio = require('cheerio');
const cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio);
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

  function getGrades(apikey, callback) {
    cisUserAuthHelper.getValidTypoCookieByApiKey(apikey, function(typoCookie) {
      const ar = request.jar();
      const cookie = request.cookie('fe_typo_user=' + typoCookie);
      const url = 'https://cis.nordakademie.de/pruefungsamt/pruefungsergebnisse/?no_cache=1';
      ar.setCookie(cookie, url);
      request.get({url: url, jar: ar}, function (err, httpContent, body) {
        const $ = cheerio.load(body);
        const keys = ['modulenumber', 'description', 'exam_date', 'entry_date', 'grade', 'credits'];
        callback(utils.parseTableGrades($, '#curricular table tbody tr', keys, keys.length));
      });
    });
  }

  function getSeminarsParticipated(userkey, callback) {
    cisUserAuthHelper.getValidTypoCookieByApiKey(userkey, function(typoCookie) {
      const ar = request.jar();
      const cookie = request.cookie('fe_typo_user=' + typoCookie);
      const url = 'https://cis.nordakademie.de/pruefungsamt/pruefungsergebnisse/?no_cache=1';
      ar.setCookie(cookie, url);
      request.get({url: url, jar: ar}, function (err, httpContent, body) {
        const $ = cheerio.load(body);
        const keys = ['description', 'period', 'grade', 'credits'];
        callback(utils.parseTableGrades($, '#seminar table tbody tr', keys, keys.length));
      });
    });
  }

  function getSeminars(userkey, week, quarter, callback) {
    cisUserAuthHelper.getValidTypoCookieByApiKey(userkey, function (typoCookie) {
      if (typoCookie === false) {
        callback(false);
      } else {
        const ar = request.jar();
        const cookie = request.cookie('fe_typo_user=' + typoCookie);
        const url = 'https://cis.nordakademie.de/seminarwesen/?tx_nasemdb_pi1[action]=programm';
        ar.setCookie(cookie, url);
        request.get({url: url, jar: ar}, function (err, httpContent, body) {
          const $ = cheerio.load(body);
          const keys = ['description', 'period', 'grade', 'credits'];
          callback(utils.parseTableGrades($, 'table:last tbody tr', keys, keys.length));
        });
      }
    });
  }

  return {
    getUserDetails,
    getGrades,
    getSeminarsParticipated,
    getSeminars
  };
})();
