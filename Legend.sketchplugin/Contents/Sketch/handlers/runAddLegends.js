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

    let artboardsProcessed = 0;
    page.artboards().forEach(artboard => {
      if (isArtboard(artboard)) {
        legendifyArtboard({
          artboard,
          symbolsDictionary,
          document,
          onProcessed() {
            artboardsProcessed++;
            if (artboardsProcessed === page.artboards().length) {
              artboardsProcessed = 0;
              adjustArtboardPositions(page.artboards());
              document.showMessage('All Artboards processed.');
            }
          }
        });
      }
    });
  });
};
