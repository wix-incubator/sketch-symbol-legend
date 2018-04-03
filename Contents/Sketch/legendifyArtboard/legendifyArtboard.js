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

  const layers = Array.from(layer.layers());

  const layersCache = layers.map(layer => {
    const frame = layer.frame();
    return {
      x: frame.x(),
      y: frame.y(),
      cls: layer.class(),
      isWixStyleReactLayer: isWixStyleReactLayer(layer),
      layer,
    };
  });

  layersCache
    .sort((a, b) => (
      (a.y - b.y) < 0 ||
      (a.x - b.x) < 0 ?
        -1 :
        1
    ))
    .forEach(({ layer, x, y, cls, isWixStyleReactLayer }) => {
      if (!isSketchStringsEqual(cls, SYMBOL_INSTANCE_CLASS_NAME)) {
        legendify({
          layer,
          artboard,
          layerOffsetTop: layerOffsetTop + y,
          layerOffsetLeft: layerOffsetTop + x,
          symbolsDictionary,
          getLegendItemIndex,
          legendItems,
        });
      }

      if (isWixStyleReactLayer) {
        const legendItemIndex = getLegendItemIndex();

        createLegendItemIndex({
          layer,
          artboard: artboard,
          layerIndex: legendItemIndex,
          layerOffsetTop,
          layerOffsetLeft,
        });

        legendItems.push(
          getLegendItemDescription({
            layer,
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
