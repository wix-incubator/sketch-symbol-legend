const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const cleanUpPageLegends = require('./utils/cleanUpPageLegends');
const createLegendItemIndexGenerator = require('./utils/createLegendItemIndexGenerator');
const createLegendArtboard = require('./utils/createLegendArtboard');
const createLegendItemIndex = require('./utils/createLegendIndex');
const createSymbolsDictionary = require('./utils/createSymbolsDictionary');
const createLegendItem = require('./utils/createLegendItem');

const {
  ARTBOARD_GROUP_CLASS_NAME,
  SYMBOL_INSTANCE_CLASS_NAME,
  LEGEND_ARTBOARD_MIN_WIDTH,
} = require('./constants');

const WIX_STYLE_REACT_LAYER_PATTERN = /(\/\s*)?\d\.\d[^\/]+$/;

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

  if (artboardFrame.width() < LEGEND_ARTBOARD_MIN_WIDTH) {
    artboardFrame.width = LEGEND_ARTBOARD_MIN_WIDTH;
  }

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

function runCleanUpLegends({ document }) {
  document.pages().forEach(page => {
    cleanUpPageLegends(page);
  });
}

function runAddLegends({ document }) {
  const symbolsDictionary = createSymbolsDictionary(
    document.documentData().allSymbols()
  );

  // cleanup previous legends on rerun
  document.pages().forEach(page => {
    cleanUpPageLegends(page);

    page.artboards().forEach(artboard => {
      if (isSketchStringsEqual(artboard.class(), ARTBOARD_GROUP_CLASS_NAME)) {
        legendifyArtboard({ artboard, page, symbolsDictionary });
      }
    });
  });
}

/* Export plugin commands handlers */
this.runCleanUpLegends = runCleanUpLegends;
this.runAddLegends = runAddLegends;
