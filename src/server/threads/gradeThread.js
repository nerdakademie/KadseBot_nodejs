const TelegramHelper = require('../helper/TelegramHelper');

const f = function () {
  setTimeout(function () {
    // TelegramHelper.executeTest();
    f();
  }, 100);
};
f();
