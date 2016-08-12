const request = require('request');
const cheerio = require('cheerio');
const utils = require('../../utils');

module.exports = (() => {
  'use strict';

  function parseSetCookies(cookieArray) {
    const list = {};
    cookieArray.forEach(function (cookieItem) {
      cookieItem.split(';').forEach(function (cookie) {
        const parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
      });
    });
    return list;
  }

  function getNAKAuthCookie(username, password, callback) {
    request.post({url: 'https://cis.nordakademie.de/startseite/?no_cache=1', form: {logintype: "login", pid: 0, user: username, pass: password}}, function(err,httpResponse,body){
      if (httpResponse.statusCode === 404) {
        callback(false);
      } else if (httpResponse.statusCode === 303) {
        // We are being redirected
        const cookies = httpResponse.headers['set-cookie'];
        if (cookies === null) {
          callback(false);
        } else {
          const cookieList = parseSetCookies(cookies);
          if (cookieList.fe_typo_user === null) {
            callback(false);
          } else {
            callback(cookieList.fe_typo_user);
          }
        }
      }
    });
  }

  function getNAKUserDetails(username, password, callback) {
    getNAKAuthCookie(username, password, function (cookieResult) {
      const ar = request.jar();
      const cookie = request.cookie('fe_typo_user='+ cookieResult);
      const url = 'https://cis.nordakademie.de/nacommunity/mein-profil/?no_cache=1';
      ar.setCookie(cookie, url);
      request.get({url: url, jar: ar}, function (err, httpContent, body) {
        const $ = cheerio.load(body);
        callback(utils.parseTable($, 'form table tr'));
      });
    });

  }

  function isNAKUser(username, password, callback) {
    request.post({url: 'https://cis.nordakademie.de/startseite/?no_cache=1', form: {logintype: "login", pid: 0, user: username, pass: password}}, function (err,httpResponse,body) {
      if (httpResponse.statusCode === 404) {
        callback(false);
      } else if (httpResponse.statusCode === 303) {
        // We are being redirected
        callback(true);
      }
    });
  }

  return {
    getNAKAuthCookie,
    getNAKUserDetails,
    isNAKUser
  };
})();
