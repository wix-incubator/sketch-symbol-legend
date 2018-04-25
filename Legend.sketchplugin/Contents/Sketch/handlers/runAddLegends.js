const { isArtboard } = require('../utils/classMatchers');
const createSymbolsDictionary = require('../utils/createSymbolsDictionary');
const adjustArtboardPositions = require('../utils/adjustArtboardPositions');
const legendifyArtboard = require('../legendifyArtboard/legendifyArtboard');
const { cleanUpPageLegends } = require('../cleanUp');

module.exports = ({ document }) => {
  coscript.shouldKeepAround = false;

  const symbolsDictionary = createSymbolsDictionary(
    document.documentData().allSymbols()
  );

  document.pages().forEach(page => {
    // cleanup previous legends on rerun
    cleanUpPageLegends(page);

    page.artboards().forEach(artboard => {
      if (isArtboard(artboard)) {
        legendifyArtboard({
          artboard,
          symbolsDictionary,
          document,
        });
      }
    });

    adjustArtboardPositions(page.artboards());
  });
};
