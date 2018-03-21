const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const cleanUpPageLegends = require('./utils/cleanUpPageLegends');
const createLegendItemOffsetGenerator = require('./utils/createLegendItemOffsetGenerator');
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

function legendify({ currentLayer, parentArtboard, legendArtboard, layerIndex = 0, symbolsDictionary, getLegendItemOffsetTop }) {
  if (!currentLayer.layers) {
    return;
  }
  currentLayer.layers().forEach((layer, index) => {
    const currentLayerIndex = index + layerIndex;
    if (!isSketchStringsEqual(layer.class(), SYMBOL_INSTANCE_CLASS_NAME)) {
      legendify({currentLayer: layer, parentArtboard, legendArtboard, layerIndex: currentLayerIndex, symbolsDictionary});
    }

    if (layer.overrides) {
      createLegendItemIndex({
        layer,
        name: LEGEND_ITEM_INDEX_NAME,
        layerIndex: currentLayerIndex,
        artboard: parentArtboard
      });
      createLegendItem({
        layer,
        layerIndex: currentLayerIndex,
        legendArtboard,
        symbolsDictionary,
        offsetTop: getLegendItemOffsetTop(),
      });
    }
  });
}

function legendifyArtboard({artboard, page, symbolsDictionary}) {
  const legendArtboard = createLegendArtboard({artboard, page});
  const getLegendItemOffsetTop = createLegendItemOffsetGenerator();

  legendify({
    currentLayer: artboard,
    parentArtboard: artboard,
    legendArtboard,
    symbolsDictionary,
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
