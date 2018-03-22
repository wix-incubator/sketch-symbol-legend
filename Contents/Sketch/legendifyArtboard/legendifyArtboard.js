const isSketchStringsEqual = require('../utils/isSketchStringsEqual');
const createLegendItemIndexGenerator = require('./createLegendItemIndexGenerator');
const createLegendArtboard = require('./createLegendArtboard');
const createLegendItemIndex = require('./createLegendIndex');
const createLegendItem = require('./createLegendItem');

const { SYMBOL_INSTANCE_CLASS_NAME } = require('../constants');

const WIX_STYLE_REACT_LAYER_PATTERN = /(\/\s*)?\d+\.\d+[^\/]+$/;

const LEGEND_PADDING = 20;

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
  legendArtboard,
  getLegendItemIndex,
}) {
  if (!layer.layers) {
    return;
  }
  layer.layers().forEach(childLayer => {
    if (!isSketchStringsEqual(childLayer.class(), SYMBOL_INSTANCE_CLASS_NAME)) {
      legendify({
        layer: childLayer,
        artboard,
        legendArtboard,
        layerOffsetTop: layerOffsetTop + childLayer.frame().y(),
        layerOffsetLeft: layerOffsetTop + childLayer.frame().x(),
        symbolsDictionary,
        getLegendItemIndex,
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
      createLegendItem({
        layer: childLayer,
        layerIndex: legendItemIndex,
        legendArtboard,
        symbolsDictionary,
      });
    }
  });
}

function adjustToFitLegendArtboard(artboard) {
  const artboardObject = artboard._object;
  const artboardFrame = artboardObject.frame();

  if (!artboardObject.layers().length) {
    artboardObject.removeFromParent();
    return;
  }

  artboard.adjustToFit();
  artboardFrame.width = artboardFrame.width() + LEGEND_PADDING * 2;
  artboardFrame.height = artboardFrame.height() + LEGEND_PADDING * 2;
  artboardObject.layers().forEach(layer => {
    layer.frame().x = layer.frame().x() + LEGEND_PADDING;
    layer.frame().y = layer.frame().y() + LEGEND_PADDING;
  });
  // update x position after artboard size and paddings updated
  artboardFrame.x = artboardFrame.x() - artboardFrame.width();
}

function legendifyArtboard({ artboard, page, symbolsDictionary }) {
  const legendArtboard = createLegendArtboard({ artboard, page });
  const getLegendItemIndex = createLegendItemIndexGenerator();

  legendify({
    layer: artboard,
    artboard,
    legendArtboard,
    symbolsDictionary,
    getLegendItemIndex,
  });

  adjustToFitLegendArtboard(legendArtboard);
}

module.exports = legendifyArtboard;