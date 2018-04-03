const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const { LEGEND_ARTBOARD_NAME, LEGEND_BADGE_NAME } = require('./constants');

function getLayersToRemove({ layer, itemsToRemove = [] }) {
  const name = layer.name();

  if (isSketchStringsEqual(name, LEGEND_BADGE_NAME)) {
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

function cleanUpArtboardLegendsIndexes(layer) {
  // sketch behave strange while deleting layers in loop, so remove items in two steps
  const layersToRemove = getLayersToRemove({ layer });

  layersToRemove.forEach(layer => {
    layer.removeFromParent();
  });
}

function isLegendArtboard(artboard) {
  return artboard.name().endsWith(LEGEND_ARTBOARD_NAME);
}

function cleanUpPageLegends(page) {
  page.artboards().forEach(artboard => {
    if (isLegendArtboard(artboard)) {
      artboard.removeFromParent();
      return;
    }

    cleanUpArtboardLegendsIndexes(artboard);
  });
}

function cleanUpArtboardLegends(artboard) {
  const page = artboard.parentGroup();

  if (isLegendArtboard(artboard)) {
    return;
  }

  const legendArtboardName = `${artboard.name()}${LEGEND_ARTBOARD_NAME}`;
  const legendArtboard = page
    .artboards()
    .find(_artboard =>
      isSketchStringsEqual(_artboard.name(), legendArtboardName)
    );

  if (legendArtboard) {
    legendArtboard.removeFromParent();
  }

  cleanUpArtboardLegendsIndexes(artboard);
}

module.exports = {
  isLegendArtboard,
  cleanUpPageLegends,
  cleanUpArtboardLegends,
};
