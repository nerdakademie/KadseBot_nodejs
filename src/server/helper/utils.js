module.exports = (() => {
  function parseTable(cheerioHandle) {
    const tableDictionary = {};
    cheerioHandle('tr').each(function (id, elem) {
      console.log(elem[0].text());
    });
  }

  function removeWhitespace(text) {
    return text.trim().replace(/\s\s+/g, '');
  }

  return {
    removeWhitespace
  };
})();
