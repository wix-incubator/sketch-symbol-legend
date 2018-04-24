const isSketchStringsEqual = require('../utils/isSketchStringsEqual');
const createSymbolsDictionary = require('../utils/createSymbolsDictionary');
const legendifyArtboard = require('../legendifyArtboard/legendifyArtboard');
const { cleanUpPageLegends } = require('../cleanUp');
const { ARTBOARD_GROUP_CLASS_NAME } = require('../constants');

module.exports = ({ document }) => {
  coscript.shouldKeepAround = false;

  const symbolsDictionary = createSymbolsDictionary(
    document.documentData().allSymbols()
  );

  document.pages().forEach(page => {
    // cleanup previous legends on rerun
    cleanUpPageLegends(page);

    page.artboards().forEach(artboard => {
      if (isSketchStringsEqual(artboard.class(), ARTBOARD_GROUP_CLASS_NAME)) {
        legendifyArtboard({
          artboard,
          symbolsDictionary,
          document,
        });
      }
    });
  });
};
