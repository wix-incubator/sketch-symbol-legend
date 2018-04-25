const { isSymbol } = require('../utils/classMatchers');
const createIndexGenerator = require('../utils/createIndexGenerator');
const isActiveLibraryLayer = require('../utils/isActiveLibraryLayer');
const Promifill = require('../utils/promifill');
const { getLayersCache } = require('../utils/layers');

const { createLegendBadge, createLegendBadgesGroup } = require('./createLegendBadges');
const getLegendItemDescription = require('./getLegendItemDescription');
const createLegendGroup = require('./createLegendGroup');

function legendify({
  layer,
  layerOffsetTop = 0,
  layerOffsetLeft = 0,
  symbolsDictionary,
  artboard,
  getLegendItemIndex,
  legendItems,
  legendIndexItems,
}) {
  if (!layer.layers) {
    return;
  }

  const processLayer = ({ layer, x, y, cls }) => {
    if (!isSymbol(cls)) {
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

    if (isActiveLibraryLayer(layer)) {
      const legendItemIndex = getLegendItemIndex();

      legendIndexItems.push.apply(
        legendIndexItems,
        createLegendBadge({
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
  };

  getLayersCache(layer).forEach(processLayer);
}

const legendifyArtboard = ({ artboard, document, symbolsDictionary }) =>
  new Promifill(resolve => {
    artboard.setIsLocked(true);

    const legendItems = [];
    const legendIndexItems = [];

    legendify({
      layer: artboard,
      artboard,
      document,
      symbolsDictionary,
      getLegendItemIndex: createIndexGenerator(),
      legendItems,
      legendIndexItems,
    });

    if (legendItems.length) {
      createLegendBadgesGroup(artboard, legendIndexItems);
      createLegendGroup({ artboard, legendItems });
    }

    return resolve();
  }).finally(() => artboard.setIsLocked(false));

module.exports = legendifyArtboard;
