const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const OFFSET_TOP = 15;

function createLegendItemIndex({ name, layer, artboard, layerIndex, layerOffsetLeft, layerOffsetTop }) {
  const itemIndexOffsetLeft = Math.max(layer.frame().x() + layerOffsetLeft, 0);
  const itemIndexOffsetTop = Math.max(layer.frame().y() + layerOffsetTop - OFFSET_TOP, 0);
  const rect = new Rectangle(itemIndexOffsetLeft, itemIndexOffsetTop , layer.frame().width(), layer.frame().height());
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
