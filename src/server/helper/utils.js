
module.exports = (() => {
  'use strict';
  function parseTableDetails(cheerioHandle, selection) {
    const tableDictionary = {};
    cheerioHandle(selection).each(function (id, elem) {
      const children = cheerioHandle(elem).children();
      const dictKey = removeWhitespace(children.eq(0).text());
      if (dictKey.indexOf('ändern') === -1 && dictKey !== '') {
        tableDictionary[dictKey] = children.eq(1).text().trim();
      }
    });
    return tableDictionary;
  }

  function parseTableGrades(cheerioHandle, selection, keys, elementCount) {
    const tableDictionary = [];
    cheerioHandle(selection).each(function (id, elem) {
      const eachEntry = {};
      const children = cheerioHandle(elem).children();
      for (let count = 0; count < elementCount; count++) {
        eachEntry[keys[count]] = removeWhitespace(children.eq(count).text());
      }
      tableDictionary.push(eachEntry);
    });
    return tableDictionary;
  }

  function removeWhitespace(text) {
    return text.trim().replace(/\s\s+/g, '');
  }

  return {
    removeWhitespace,
    parseTableDetails,
    parseTableGrades
  };
})();
