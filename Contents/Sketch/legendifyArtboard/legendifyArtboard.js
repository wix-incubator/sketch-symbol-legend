const isSketchStringsEqual = require('../utils/isSketchStringsEqual');
const createLegendItemIndexGenerator = require('./createLegendItemIndexGenerator');
const createLegendItemIndex = require('./createLegendIndex');
const getLegendItemDescription = require('./getLegendItemDescription');
const createLegendArtboard = require('./createLegendArtboard');

const { SYMBOL_INSTANCE_CLASS_NAME } = require('../constants');

const WIX_STYLE_REACT_LAYER_PATTERN = /(\/\s*)?\d+\.\d+[^\/]+$/;

function isWixStyleReactLayer(layer) {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();

  return !!(
    layer.overrides &&
    symbolMaster &&
    symbolMaster.name &&
    WIX_STYLE_REACT_LAYER_PATTERN.test(symbolMaster.name())
  );
}

function legendify({
  layer,
  layerOffsetTop = 0,
  layerOffsetLeft = 0,
  symbolsDictionary,
  artboard,
  getLegendItemIndex,
  legendItems,
}) {
  if (!layer.layers) {
    return;
  }
  layer.layers().forEach(childLayer => {
    if (!isSketchStringsEqual(childLayer.class(), SYMBOL_INSTANCE_CLASS_NAME)) {
      legendify({
        layer: childLayer,
        artboard,
        layerOffsetTop: layerOffsetTop + childLayer.frame().y(),
        layerOffsetLeft: layerOffsetTop + childLayer.frame().x(),
        symbolsDictionary,
        getLegendItemIndex,
        legendItems,
      });
    }

    if (isWixStyleReactLayer(childLayer)) {
      const legendItemIndex = getLegendItemIndex();

      createLegendItemIndex({
        layer: childLayer,
        artboard: artboard,
        layerIndex: legendItemIndex,
        layerOffsetTop,
        layerOffsetLeft,
      });
      legendItems.push(
        getLegendItemDescription({
          layer: childLayer,
          layerIndex: legendItemIndex,
          symbolsDictionary,
        })
      );
    }
  });
}

function legendifyArtboard({ artboard, page, symbolsDictionary }) {
  const getLegendItemIndex = createLegendItemIndexGenerator();

  const legendItems = [];

  legendify({
    layer: artboard,
    artboard,
    symbolsDictionary,
    getLegendItemIndex,
    legendItems,
  });

  if (legendItems.length) {
    createLegendArtboard({
      page,
      artboard,
      legendItems,
    });
  }
}

module.exports = legendifyArtboard;
