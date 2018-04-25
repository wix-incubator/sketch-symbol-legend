const getSelectedArtboards = require('../utils/getSelectedArtboards');
const createSymbolsDictionary = require('../utils/createSymbolsDictionary');
const adjustArtboardPositions = require('../utils/adjustArtboardPositions');
const legendifyArtboard = require('../legendifyArtboard/legendifyArtboard');
const { cleanUpArtboardLegends } = require('../cleanUp');

module.exports = context => {
  coscript.shouldKeepAround = false;

  const document = context.document;
  const artboards = getSelectedArtboards(context);

  if (!artboards.length) {
    document.showMessage(
      'Please select the artboards you want to add legends. ☝️ Selecting a layer inside the artboard should be enough.'
    );
    return;
  }

  const symbolsDictionary = createSymbolsDictionary(
    document.documentData().allSymbols()
  );

  let artboardsProcessed = 0;
  artboards.forEach(artboard => {
    cleanUpArtboardLegends(artboard);

    legendifyArtboard({
      document,
      artboard,
      symbolsDictionary,
      onProcessed() {
        artboardsProcessed++;
        if (artboardsProcessed === artboards.length) {
          artboardsProcessed = 0;
          adjustArtboardPositions(artboards);
          document.showMessage('All Artboards processed.');
        }
      }
    });
  });
};
