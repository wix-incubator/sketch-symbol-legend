const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const cleanUpPageLegends = require('./utils/cleanUpPageLegends');
const createLegendItemOffsetGenerator = require('./utils/createLegendItemOffsetGenerator');
const createLegendItemIndexGenerator = require('./utils/createLegendItemIndexGenerator');
const createLegendArtboard = require('./utils/createLegendArtboard');
const createLegendItemIndex = require('./utils/createLegendIndex');
const createSymbolsDictionary = require('./utils/createSymbolsDictionary');
const createLegendItem =  require('./utils/createLegendItem');

const {
  SYMBOL_INSTANCE_CLASS_NAME,
  LEGEND_ARTBOARD_NAME,
  LEGEND_ITEM_INDEX_NAME,
  LEGEND_ARTBOARD_MIN_WIDTH,
} = require('./constants');

const WIX_STYLE_REACT_LAYER_PATTERN = /(\/\s*)?\d\.\d[^\/]+$/;

function legendify({
  layer,
  layerOffsetTop = 0,
  layerOffsetLeft = 0,
  symbolsDictionary,
  artboard,
  legendArtboard,
  getLegendItemIndex,
  getLegendItemOffsetTop,
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
        getLegendItemOffsetTop,
      });
    }

    if (childLayer.overrides && WIX_STYLE_REACT_LAYER_PATTERN.test(childLayer.name())) {
      const legendItemIndex = getLegendItemIndex();

      createLegendItemIndex({
        name: LEGEND_ITEM_INDEX_NAME,
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
        offsetTop: getLegendItemOffsetTop(),
      });
    }
  });
}

function legendifyArtboard({artboard, page, symbolsDictionary}) {
  const legendArtboard = createLegendArtboard({artboard, page});
  const getLegendItemIndex = createLegendItemIndexGenerator();
  const getLegendItemOffsetTop = createLegendItemOffsetGenerator();

  legendify({
    layer: artboard,
    artboard,
    legendArtboard,
    symbolsDictionary,
    getLegendItemIndex,
    getLegendItemOffsetTop,
  });

  legendArtboard.adjustToFit();

  // TODO: figure out how to update `legendArtboard.frame.x` here (see `adjustToFitLegentArtboard`)
}

function adjustToFitLegentArtboard(document) {
  document.pages().forEach(page => page.artboards().forEach(artboard => {
    if (!artboard.name().endsWith(LEGEND_ARTBOARD_NAME)) {
      return;
    }

    const frame = artboard.frame();

    if (frame.width() < LEGEND_ARTBOARD_MIN_WIDTH) {
      frame.width = LEGEND_ARTBOARD_MIN_WIDTH;
    }

    frame.x = frame.x() - frame.width();
  }));
}

function runCleanUpLegends({ document }) {
  document.pages().forEach(page => {
    cleanUpPageLegends(page);
  });
}

function runAddLegends({ document }) {
  const symbolsDictionary = createSymbolsDictionary(document.documentData().allSymbols());

  // cleanup previous legends on rerun
  document.pages().forEach(page => {
    cleanUpPageLegends(page);

    page.artboards().forEach(artboard => {
      legendifyArtboard({artboard, page, symbolsDictionary});
    })
  });

  adjustToFitLegentArtboard(document);
}

/* Export plugin commands handlers */
this.runCleanUpLegends = runCleanUpLegends;
this.runAddLegends = runAddLegends;
