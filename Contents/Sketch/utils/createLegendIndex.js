const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const OFFSET_TOP = 15;

function createLegendItemIndex({ name, layer, artboard, layerIndex }) {
  const rect = new Rectangle(layer.frame().x(), layer.frame().y() - OFFSET_TOP , layer.frame().width(), layer.frame().height());
  const text = new sketch.Text({
    parent: artboard,
    alignment: sketch.Text.Alignment.center,
    text: `(${layerIndex})`,
    frame: rect,
  });

  // NOTE: required for valid clean up on rerun
  text.name = name;
  text.adjustToFit();
}

module.exports = createLegendItemIndex;
