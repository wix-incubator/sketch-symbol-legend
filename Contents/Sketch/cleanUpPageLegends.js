const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const {
  LEGEND_ARTBOARD_NAME,
  LEGEND_ITEM_INDEX_NAME,
} = require('./constants');

function getLayersToRemove({ layer, itemsToRemove = [] }) {
  if (isSketchStringsEqual(layer.name(), LEGEND_ITEM_INDEX_NAME)) {
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

function cleanUpLegendsIndexes(layer) {
  // sketch behave strange while deleting layers in loop, so remove items in two steps
  const layersToRemove = getLayersToRemove({ layer });

  layersToRemove.forEach(layer => {
    layer.removeFromParent();
  });
}

function cleanUpPageLegends(page) {
  page.artboards().forEach(artboard => {
    if (artboard.name().endsWith(LEGEND_ARTBOARD_NAME)) {
      artboard.removeFromParent();
      return;
    }

    cleanUpLegendsIndexes(artboard);
  });
}

module.exports = cleanUpPageLegends;
