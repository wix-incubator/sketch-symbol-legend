const isSketchStringsEqual = require('./isSketchStringsEqual');

const cleanUpLegendsIndexes = ({ layer, legendItemIndexName }) => {
  if (isSketchStringsEqual(layer.name(), legendItemIndexName)) {
    layer.removeFromParent();
    return;
  }

  if (layer.layers) {
    layer.layers().forEach(layer => {
      cleanUpLegendsIndexes({layer, legendItemIndexName});
    });
  }
};

const cleanUpLegends = ({ document, artboardName, legendItemIndexName }) => {
  document.pages().forEach(page => {
    page.artboards().forEach(artboard => {
      if (isSketchStringsEqual(artboard.name(), artboardName)) {
        artboard.removeFromParent();
      }
    });

    cleanUpLegendsIndexes({ layer: page, legendItemIndexName });
  });
};

module.exports = cleanUpLegends;