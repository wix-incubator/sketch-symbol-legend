const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const { LEGEND_ARTBOARD_NAME } = require('../constants');

const LEGEND_PADDING = 20;

function adjustToFitLegendArtboard({ legendArtboard, legendArtboardItems }) {
  const legendArtboardFrame = legendArtboard._object.frame();
  const legendArtboardItemsFrame = legendArtboardItems._object.frame();

  legendArtboard.adjustToFit();

  legendArtboardFrame.width = legendArtboardFrame.width() + LEGEND_PADDING * 2;
  legendArtboardFrame.height =
    legendArtboardFrame.height() + LEGEND_PADDING * 2;

  legendArtboardItemsFrame.x = legendArtboardItemsFrame.x() + LEGEND_PADDING;
  legendArtboardItemsFrame.y = legendArtboardItemsFrame.y() + LEGEND_PADDING;

  // update x position after artboard size and paddings updated
  legendArtboardFrame.x = legendArtboardFrame.x() - legendArtboardFrame.width();
}

function createLegendArtboard({ artboard, page, legendItems }) {
  const legendArtboard = new sketch.Artboard({
    parent: page || artboard.parentGroup(),
    name: artboard.name() + String(LEGEND_ARTBOARD_NAME),
    flowStartPoint: true,
    frame: new Rectangle(artboard.frame().x(), artboard.frame().y()),
  });

  const legendArtboardItems = new sketch.Text({
    parent: legendArtboard,
    text: legendItems.join('\n\n'),
    frame: new Rectangle(0, 0),
  });

  legendArtboardItems._object.setIsLocked(true);

  adjustToFitLegendArtboard({
    legendArtboard,
    legendArtboardItems,
  });

  return legendArtboard;
}

module.exports = createLegendArtboard;
