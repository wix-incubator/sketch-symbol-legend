const { cleanUpPageLegends } = require('../cleanUp');

module.exports = ({ document }) => {
  coscript.shouldKeepAround = false;

  document.pages().forEach(page => {
    cleanUpPageLegends(page);
  });
};
