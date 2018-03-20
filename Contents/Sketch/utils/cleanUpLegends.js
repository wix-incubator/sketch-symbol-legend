const cleanUpLegendsIndexes = ({ layer, legendItemIndexName }) => {
  // NOTE: layer.name() is object :/
  if (String(layer.name()) === legendItemIndexName) {
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
      // NOTE: artboard.name() is object :/
      if (String(artboard.name()) === artboardName) {
        artboard.removeFromParent();
      }
    });

    cleanUpLegendsIndexes({ layer: page, legendItemIndexName });
  });
};

module.exports = cleanUpLegends;