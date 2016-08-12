const request = require('request');
const cheerio = require('cheerio');
const utils = require('../../utils');
const cryptHelper = require('../../cryptHelper');
const Api = require('mongoose').model('Api');
const uuid = require('node-uuid');

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

  function getApiUserByApiKey(apiKey, callback) {
    Api.findOne({api_key: apiKey}).exec((error, apiUser) => {
      callback (apiUser);
    });
  }

  function getApiUserByName(username, callback) {
    Api.findOne({user: username}).exec((error, apiUser) => {
      callback(apiUser);
    });
  }

  function getApiKey(username, password, callback){
    isNAKUser(username, password, function(isNakusr)
    {
      if (isNakusr) {
        Api.count({user: username}, function (err, count) {
          if (err) {
            callback(false);
          } else if (count === 0) {
            getNAKAuthCookie(username, password, function (cookie) {
              if (cookie === false) {
                callback(false);
              } else {
                const apiKey = uuid.v4();
                const api = new Api({
                  user: username,
                  pass: cryptHelper.getHashFromPasswordSync(password),
                  api_key: apiKey,
                  typo_cookie: cookie
                });
                api.save((error) => {
                  if (error) {
                    callback(false);
                  } else {
                    callback({sucess: true, apikey: apiKey});
                  }
                });
              }
            });
          } else if (count === 1) {
            getApiUserByName(username, function (apiUser) {
              if (cryptHelper.isPasswordCorrectSync(password, apiUser.pass)) {
                callback({success: true, apikey: apiUser.api_key});
              }
            });
          } else {
            callback(false);
          }
        });
      }else{
        callback(false);
      }
    });
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

  function isCookieValid(nak_cookie, callback) {
    const ar = request.jar();
    const cookie = request.cookie('fe_typo_user='+ nak_cookie);
    const url = 'https://cis.nordakademie.de/pruefungsamt/pruefungsergebnisse/?no_cache=1';
    ar.setCookie(cookie, url);
    request.get({url: url, jar: ar}, function (err, httpResponse, body) {
      if (httpResponse.statusCode === 404) {
        callback(false);
      } else if (httpResponse.statusCode === 200) {
        // We are being redirected
        callback(true);
      }
    });
  }

  return {
    getNAKAuthCookie,
    getNAKUserDetails,
    getApiKey,
    isNAKUser
  };
})();
