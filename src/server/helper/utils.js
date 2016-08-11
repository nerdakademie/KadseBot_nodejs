
module.exports = (() => {
  function parseTable(cheerioHandle) {
    const tableDictionary = {};
    cheerioHandle('tr').each(function (id, elem) {
      cheerioHandle('td', elem).each(function (id2,elem2) {
        console.log(elem2.text());
      });
    });
  }

  function removeWhitespace(text) {
    return text.trim().replace(/\s\s+/g, '');
  }

  return {
    removeWhitespace,
    parseTable
  };
})();
