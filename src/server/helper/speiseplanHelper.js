const cheerio = require('cheerio');

module.exports = (() => {
  'use strict';

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  function getDates(cheerioHandle) {
    let arr = [];
    cheerioHandle('td.speiseplan-head').each(function() {
      arr.push(removeWhitespace(cheerioHandle(this).text()).split(',')[1]);
    });
    return arr;
  }

  function getMeals(cheerioHandle) {
    const arr = {};
    let dayCounter = 0;
    const Dates = getDates(cheerioHandle);
    cheerioHandle('td.speiseplan-tag-container').each(function() {
      const eachDayContent = {};
      let mealCounter = 0;
      eachDayContent.date = Dates[dayCounter] + new Date().getFullYear();
      cheerioHandle('td.speiseplan-tag', this).each(function(id, elem) {
        mealCounter += 1;
        const mealName = 'meal'.concat(mealCounter);
        eachDayContent[mealName] = meal(cheerioHandle, elem);
      });
      arr[weekdays[dayCounter]] = eachDayContent;
      dayCounter += 1;
    });
    return arr;
  }

  function meal(parserContext, element) {
    return {
      description: removeWhitespace(parserContext('.speiseplan-kurzbeschreibung', element).text()),
      price: removeWhitespace(parserContext('.speiseplan-preis', element).text()).slice(0, 4)
    };
  }

  function removeWhitespace(text) {
    return text.trim().replace(/\s\s+/g, '');
  }

  return {
    getMeals
  };
})();
