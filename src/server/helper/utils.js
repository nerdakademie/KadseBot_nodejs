
module.exports = (() => {
  function parseTable(cheerioHandle, selection) {
    const tableDictionary = {};
    cheerioHandle(selection).each(function (id, elem) {
      const children = cheerioHandle(elem).children();
      const dictKey= removeWhitespace(children.eq(0).text());
      if (dictKey.indexOf('ändern') === -1 && dictKey.lenght > 0) {
        tableDictionary[dictKey] = children.eq(1).text().trim();
      }
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
