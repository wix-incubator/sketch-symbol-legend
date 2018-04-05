const getSelectedArtboards = require('../utils/getSelectedArtboards');
const { isLegendArtboard, cleanUpArtboardLegends } = require('../cleanUp');

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

  artboards.forEach(artboard => {
    if (isLegendArtboard(artboard)) {
      artboard.removeFromParent();
      return;
    }

    cleanUpArtboardLegends(artboard);
  });
};
