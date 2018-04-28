const adjustArtboardPositions = require('../utils/adjustArtboardPositions');
const { cleanUpLegends } = require('../cleanup/legends');

module.exports = ({ document }) => {
  coscript.shouldKeepAround = false;
  document.pages().forEach(page => cleanUpLegends(page.artboards()))
  adjustArtboardPositions(document);
};
