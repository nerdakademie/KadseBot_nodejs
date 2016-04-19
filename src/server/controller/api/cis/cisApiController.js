const User = require('mongoose').model('User');
const Userhelper = require('../../../helper/userHelper');
const requestmodule = require('request');
const cheerio = require('cheerio');

module.exports = (() => {
  'use strict';
  const grades_url = "https://cis.nordakademie.de/pruefungsamt/pruefungsergebnisse/?no_cache=1";


  function getGrades(request, response) {
    Userhelper.getUserBySession(request, function(user) {
      user.nak_user;
    });
  }

  function login(request, response) {
    console.log(request.body);
    if (request.body.username == null || request.body.password == null) {
      response.json({success: false});
      response.end();
    } else {
      User.find({nak_user: request.body.username}).limit( 1 ).exec((error, users) => {
        users.map(function(user) {
          if (user == []) {
            response.json({success: false});
          }
          else if (error) {
            response.json({success: false});
          }
          else if (user.nak_pass === request.body.password) {
            request.session.user = user.nak_user;
            response.json({success: true});
          } else {
            response.json({success: false});
          }
        });
      });
    }
  }

  function logout(request, response) {
    request.session.regenerate(function(err) {
      if (err) {
        response.json({success: false});
      } else {
        response.json({success: true});
      }
    });
  }

  function speiseplan(request, response) {
    requestmodule('https://cis.nordakademie.de/service/tp-mensa/speiseplan.cmd', function(error, request_response, html) {
      if (!error && request_response.statusCode === 200) {
        const $ = cheerio.load(html);
        $('td.speiseplan-tag-container').each(function() {
          $('td.speiseplan-tag', this).each(function(iterator2, element2) {
            //console.log($(this).text().trim());
            console.log($('.speiseplan-kurzbeschreibung ', this).text().trim().trim().replace(/\s\s+/g, ''));
            console.log($('.speiseplan-preis', this).text().trim().trim().replace(/\s\s+/g, ''));
          });
        });
      }
    });
    response.end();
  }



  return {
    login,
    logout,
    speiseplan
  };
})();
