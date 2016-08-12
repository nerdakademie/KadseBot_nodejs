
module.exports = (() => {
  function parseTable(cheerioHandle, selection) {
    const tableDictionary = {};
    cheerioHandle(selection).each(function (id, elem) {
      const children = cheerioHandle(elem).children();
      tableDictionary[removeWhitespace(children.eq(0).text())] = children.eq(1).text();
    });
    return tableDictionary;
  }

  function removeWhitespace(text) {
    return text.trim().replace(/\s\s+/g, '');
  }

  return {
    removeWhitespace,
    parseTable
  };
})();
