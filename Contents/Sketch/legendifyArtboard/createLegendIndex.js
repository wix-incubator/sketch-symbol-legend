const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const { LEGEND_ITEM_INDEX_NAME } = require('../constants');

const OFFSET_TOP = 15;

function createLegendItemIndex({
  layer,
  artboard,
  layerIndex,
  layerOffsetLeft,
  layerOffsetTop,
}) {
  const itemIndexOffsetLeft = layer.frame().x() + layerOffsetLeft;
  const itemIndexOffsetTop = Math.max(
    layer.frame().y() + layerOffsetTop - OFFSET_TOP,
    0
  );
  const rect = new Rectangle(
    itemIndexOffsetLeft,
    itemIndexOffsetTop,
    layer.frame().width(),
    layer.frame().height()
  );
  const text = new sketch.Text({
    parent: artboard,
    alignment: sketch.Text.Alignment.left,
    text: `(${layerIndex})`,
    frame: rect,
  });

  // NOTE: required for valid clean up on rerun
  text.name = LEGEND_ITEM_INDEX_NAME;
  text._object.style().contextSettings().opacity = 0.2;
  text.adjustToFit();
}

module.exports = createLegendItemIndex;
