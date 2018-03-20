const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const { LEGEND_ARTBOARD_NAME } = require('../constants');

function createLegendArtboard({ artboard, page }) {
  const rect = new Rectangle(artboard.frame().x(), artboard.frame().y());

  return new sketch.Artboard({
    parent: page,
    name: String(LEGEND_ARTBOARD_NAME),
    flowStartPoint: true,
    frame: rect,
  });
}

module.exports = createLegendArtboard;
