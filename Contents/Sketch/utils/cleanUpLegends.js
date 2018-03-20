const isSketchStringsEqual = require('./isSketchStringsEqual');


function getLayersToRemove({layer, legendItemIndexName, itemsToRemove = []}) {
  if (isSketchStringsEqual(layer.name(), legendItemIndexName)) {
    itemsToRemove.push(layer);
    return;
  }

  if (layer.layers) {
    layer.layers().forEach(layer => {
      getLayersToRemove({
        layer: layer,
        legendItemIndexName,
        itemsToRemove
      });
    });
  }

  return itemsToRemove;
}

function cleanUpLegendsIndexes({ layer, legendItemIndexName }) {
  // sketch behave strange while deleting layers in loop, so remove items in two steps
  const layersToRemove = getLayersToRemove({layer, legendItemIndexName});

  layersToRemove.forEach(layer => {
    layer.removeFromParent();
  });
}

function cleanUpLegends({ document, artboardName, legendItemIndexName }) {
  document.pages().forEach(page => {
    page.artboards().forEach(artboard => {
      if (isSketchStringsEqual(artboard.name(), artboardName)) {
        artboard.removeFromParent();
        return;
      }

      cleanUpLegendsIndexes({ layer: page, legendItemIndexName });
    });
  });
}

module.exports = cleanUpLegends;