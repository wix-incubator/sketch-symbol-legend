const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const { adjustArtboardHeight } = require('./utils/adjustArtboardHeight');
const { LEGEND_CONTENT_NAME, LEGEND_BADGES_NAME } = require('./constants');

function getLayersToRemove({ layer, itemsToRemove = [] }) {
  const name = layer.name();

  if (isSketchStringsEqual(name, LEGEND_BADGES_NAME) || isSketchStringsEqual(name, LEGEND_CONTENT_NAME)) {
    itemsToRemove.push(layer);
    return;
  }

  if (layer.layers) {
    layer.layers().forEach(layer => {
      getLayersToRemove({ layer, itemsToRemove });
    });
  }

  return itemsToRemove;
}

function cleanUpLegend(artboard) {
  // sketch behaves strange while deleting layers in loop, so remove items in two steps
  const layersToRemove = getLayersToRemove({ layer: artboard });

  layersToRemove.forEach(layer => {
    layer.removeFromParent();
  });

  adjustArtboardHeight(artboard);
}

function cleanUpPageLegends(page) {
  page.artboards().forEach(artboard => {
    cleanUpLegend(artboard);
  });
}

function cleanUpArtboardLegends(artboard) {
  cleanUpLegend(artboard);
}

module.exports = {
  cleanUpPageLegends,
  cleanUpArtboardLegends,
};
