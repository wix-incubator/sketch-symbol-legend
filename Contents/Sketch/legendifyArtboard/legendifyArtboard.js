const isSketchStringsEqual = require('../utils/isSketchStringsEqual');
const createIndexGenerator = require('../utils/createIndexGenerator');
const isWixStyleReactLayer = require('../utils/isWixStyleReactLayer');
const asyncForEach = require('../utils/asyncForEach');

const createLegendItemIndex = require('./createLegendIndex');
const getLegendItemDescription = require('./getLegendItemDescription');
const createLegendArtboard = require('./createLegendArtboard');

const { Group } = require('sketch/dom');
const { SYMBOL_INSTANCE_CLASS_NAME, LEGEND_GROUP_NAME } = require('../constants');

function legendify({
  layer,
  layerOffsetTop = 0,
  layerOffsetLeft = 0,
  symbolsDictionary,
  artboard,
  document,
  getLegendItemIndex,
  legendItems,
  legendIndexItems,
  onDone
}) {
  if (!layer.layers) {
    return;
  }

  const layersCache = Array
    .from(layer.layers())
    .map(layer => {
      const frame = layer.frame();
      return {
        x: frame.x(),
        y: frame.y(),
        cls: layer.class(),
        layer,
      };
    })
    .sort((a, b) => a.y - b.y || a.x - b.x);

  const processLayer = ({ layer, x, y, cls }) => {
    artboard.setIsLocked(true);

    try {
      document.showMessage(`Processing Artboard: ${artboard.name()}`);
    } catch (e) {
      //TODO: investigate why errors are coming after everything processed, even though all messages are shown
    }

    if (!isSketchStringsEqual(cls, SYMBOL_INSTANCE_CLASS_NAME)) {
      legendify({
        layer,
        artboard,
        layerOffsetTop: layerOffsetTop + y,
        layerOffsetLeft: layerOffsetTop + x,
        symbolsDictionary,
        getLegendItemIndex,
        legendItems,
        legendIndexItems,
      });
    }

    if (isWixStyleReactLayer(layer)) {
      const legendItemIndex = getLegendItemIndex();

      legendIndexItems.push.apply(
        legendIndexItems,
        createLegendItemIndex({
          layer,
          layerIndex: legendItemIndex,
          layerOffsetTop,
          layerOffsetLeft,
        })
      );

      legendItems.push(
        getLegendItemDescription({
          layer,
          layerIndex: legendItemIndex,
          symbolsDictionary,
        })
      );
    }

    artboard.setIsLocked(false);
  };

  if (onDone) {
    asyncForEach(layersCache, processLayer, onDone);
    return;
  }

  layersCache.forEach(processLayer);
}

function legendifyArtboard({ artboard, document, page, symbolsDictionary }) {
  const legendItemsGroup = new Group({
    name: LEGEND_GROUP_NAME,
    parent: artboard
  });

  let legendItems = [];
  let legendIndexItems = [];

  legendify({
    layer: artboard,
    artboard,
    document,
    symbolsDictionary,
    getLegendItemIndex: createIndexGenerator(),
    legendItems,
    legendIndexItems,
    onDone() {
      if (!legendItems.length) {
        return;
      }

      legendItemsGroup.layers = legendIndexItems;

      document.showMessage('All Artboards processed.');
      coscript.shouldKeepAround = false;

      createLegendArtboard({
        page,
        artboard,
        legendItems,
      });
    }
  });
}

module.exports = legendifyArtboard;
