const getSelectedArtboards = require('../utils/getSelectedArtboards');
const { cleanUpArtboardLegends } = require('../cleanUp');
const createSymbolsDictionary = require('../utils/createSymbolsDictionary');
const legendifyArtboard = require('../legendifyArtboard/legendifyArtboard');

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

  artboards.forEach(artboard => {
    cleanUpArtboardLegends(artboard);

    legendifyArtboard({
      document,
      artboard,
      symbolsDictionary,
    });
  });
};
