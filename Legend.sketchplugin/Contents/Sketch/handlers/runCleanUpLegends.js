const { cleanUpLegends } = require('../cleanUp');

module.exports = ({ document }) => {
  coscript.shouldKeepAround = false;

  document.pages().forEach(page => {
    cleanUpLegends(page.artboards());
  });
};
