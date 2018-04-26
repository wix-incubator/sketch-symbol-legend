const { LEGEND_CONTENT_NAME, LEGEND_BADGES_NAME } = require('../constants');
const { restoreArtboardDimensions } = require('./restoreArtboardDimensions');
const { findLayer } = require('../utils/layers');

const getLayersToRemove = artboard => [
  findLayer(artboard, LEGEND_CONTENT_NAME),
  findLayer(artboard, LEGEND_BADGES_NAME),
].filter(Boolean);

function cleanUpLegend(artboard) {
  restoreArtboardDimensions(artboard);
  getLayersToRemove(artboard).forEach(layer => layer.removeFromParent());
}

function cleanUpLegends(artboards) {
  artboards.forEach(cleanUpLegend);
}

module.exports = {
  cleanUpLegends,
};
