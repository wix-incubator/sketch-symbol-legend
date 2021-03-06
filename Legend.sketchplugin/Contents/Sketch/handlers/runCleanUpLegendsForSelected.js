const getSelectedArtboards = require('../utils/getSelectedArtboards');
const adjustArtboardPositions = require('../utils/adjustArtboardPositions');
const { cleanUpLegends } = require('../cleanup/legends');

module.exports = context => {
  coscript.shouldKeepAround = false;

  const document = context.document;
  const artboards = getSelectedArtboards(context);

  if (!artboards.length) {
    document.showMessage(
      'Please select the artboards you want to clean up legends. ☝️ Selecting a layer inside the artboard should be enough.'
    );
    return;
  }

  cleanUpLegends(artboards);
  adjustArtboardPositions(document);
};
