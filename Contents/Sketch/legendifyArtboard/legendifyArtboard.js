const isSketchStringsEqual = require('../utils/isSketchStringsEqual');
const createLegendItemIndexGenerator = require('./createLegendItemIndexGenerator');
const createLegendItemIndex = require('./createLegendIndex');
const getLegendItemDescription = require('./getLegendItemDescription');
const createLegendArtboard = require('./createLegendArtboard');
const { getLibraryName } = require('../utils/symbol');

const { SYMBOL_INSTANCE_CLASS_NAME } = require('../constants');

function isWixStyleReactLayer(layer) {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();

  return !!(
    layer.overrides &&
    symbolMaster &&
    isSketchStringsEqual(getLibraryName(symbolMaster), 'Wix Style')
  );
}

function legendify({
  layer,
  layerOffsetTop = 0,
  layerOffsetLeft = 0,
  symbolsDictionary,
  artboard,
  document,
  getLegendItemIndex,
  legendItems,
  onDone,
}) {
  if (!layer.layers) {
    return;
  }

  let doneLayersCount = 0;

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
      coscript.shouldKeepAround = true;
      coscript.scheduleWithInterval_jsFunction(0.01, () => {
        document.showMessage(
          `Processing Artboard: ${artboard.name()} !!! PLEASE DO NOT REMOVE ANY ELEMENTS !!!`
        );
        if (!isSketchStringsEqual(cls, SYMBOL_INSTANCE_CLASS_NAME)) {
          legendify({
            layer,
            artboard,
            layerOffsetTop: layerOffsetTop + y,
            layerOffsetLeft: layerOffsetTop + x,
            symbolsDictionary,
            getLegendItemIndex,
            legendItems,
            onDone() {}
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
        doneLayersCount++;

        if (doneLayersCount === layersCache.length) {
          onDone();
        }
        coscript.shouldKeepAround = false;
      });
    });
}

function legendifyArtboard({ artboard, document, page, symbolsDictionary }) {
  const getLegendItemIndex = createLegendItemIndexGenerator();
  const legendItems = [];

  legendify({
    layer: artboard,
    artboard,
    document,
    symbolsDictionary,
    getLegendItemIndex,
    legendItems,
    onDone() {
      if (legendItems.length) {
        document.showMessage('All Artboards processed.');
        createLegendArtboard({
          page,
          artboard,
          legendItems,
        });
      }
    }
  });
}

module.exports = legendifyArtboard;
