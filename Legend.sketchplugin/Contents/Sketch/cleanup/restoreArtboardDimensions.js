const { LEGEND_CONTENT_NAME } = require('../constants');
const { findLayer } = require('../utils/layers');
const adjustLayerFrame = require('../utils/adjustLayerFrame');

function restoreArtboardDimensions(artboard) {
  const legendContentGroup = findLayer(artboard, LEGEND_CONTENT_NAME);
  if (!legendContentGroup) {
    return;
  }

  adjustLayerFrame(artboard, {
    height: artboard.frame().height() - legendContentGroup.frame().height(),
  });
}

module.exports = {
  restoreArtboardDimensions,
};
