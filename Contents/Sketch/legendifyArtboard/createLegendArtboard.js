const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const { LEGEND_ARTBOARD_NAME } = require('../constants');

const LEGEND_PADDING = 20;

function createLegendArtboard({ artboard, page, legendItems }) {
  const artboardHeight = artboard.frame().height();
  const artboardWidth = artboard.frame().width();
  const artboardX = artboard.frame().x();
  const artboardY = artboard.frame().y();

  const legendArtboard = new sketch.Artboard({
    parent: page || artboard.parentGroup(),
    name: artboard.name() + String(LEGEND_ARTBOARD_NAME),
    flowStartPoint: true,
    frame: new Rectangle(artboardX, artboardY + artboardHeight),
  });

  const legendArtboardItems = new sketch.Text({
    parent: legendArtboard,
    text: legendItems.join('\n\n'),
    frame: new Rectangle(LEGEND_PADDING, LEGEND_PADDING),
    fixedWidth: false,
  });

  legendArtboardItems._object.setIsLocked(true);

  const legendArtboardFrame = legendArtboard._object.frame();
  const legendArtboardItemsFrame = legendArtboardItems._object.frame();

  legendArtboardItems._object.setTextBehaviour(1);
  legendArtboardItemsFrame.width = artboardWidth - LEGEND_PADDING * 2;
  legendArtboardFrame.width = artboardWidth;
  legendArtboardFrame.height = legendArtboardItemsFrame.height() + LEGEND_PADDING * 2;

  return legendArtboard;
}

module.exports = createLegendArtboard;
