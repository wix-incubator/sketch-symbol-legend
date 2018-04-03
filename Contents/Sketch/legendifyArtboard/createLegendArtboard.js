const sketch = require('sketch');
const { Rectangle, Group } = require('sketch/dom');
const drawBadge = require('../drawers/badge');

const { LEGEND_ARTBOARD_NAME, LEGEND_GROUP_NAME } = require('../constants');

const LEGEND_PADDING = 20;

function adjustToFitLegendArtboard({ legendArtboard, legendArtboardItems }) {
  const legendArtboardFrame = legendArtboard._object.frame();
  const legendArtboardItemsFrame = legendArtboardItems._object.frame();

  legendArtboard.adjustToFit();

  legendArtboardFrame.width = legendArtboardFrame.width() + LEGEND_PADDING * 2;
  legendArtboardFrame.height = legendArtboardFrame.height() + LEGEND_PADDING * 2;

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

  const TEXT_OFFSET = 3 * LEGEND_PADDING;

  const layers = legendItems.reduce(({ items, offsetTop }, { description, layerIndex }) => {
    const descriptionNode = new sketch.Text({
      text: description,
      frame: new Rectangle(TEXT_OFFSET, offsetTop),
    });

    const [ badgeNode, textNode ] = drawBadge(0, offsetTop, layerIndex);
    const linesCount = description.split('\n').length;

    return {
      items: [...items, descriptionNode, badgeNode, textNode],
      offsetTop: offsetTop + linesCount * 15,
    };
  }, { items: [], offsetTop: 0 });

  const legendArtboardItems = new Group({
    parent: legendArtboard,
    name: LEGEND_GROUP_NAME,
    layers: layers.items,
  });

  legendArtboardItems._object.setIsLocked(true);

  adjustToFitLegendArtboard({
    legendArtboard,
    legendArtboardItems,
  });

  return legendArtboard;
}

module.exports = createLegendArtboard;
