
module.exports = (() => {
  function parseTable(cheerioHandle) {
    const tableDictionary = {};
    cheerioHandle('form table tr').each(function (id, elem) {
      const children = cheerioHandle(this).children();
      console.log(children.eq(0));
      console.log(children.eq(1));
      /*
       cheerioHandle('td', elem).each(function (id2, elem2) {
        console.log(elem2.text());
      });
       */
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
