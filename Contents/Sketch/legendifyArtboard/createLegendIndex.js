const drawBadge = require('../drawers/badge');

const OFFSET_TOP = 15;

function createLegendItemIndex({
  layer,
  artboard,
  layerIndex,
  layerOffsetLeft,
  layerOffsetTop,
}) {
  const frame = layer.frame();

  drawBadge(
    frame.x() + layerOffsetLeft,
    Math.max(frame.y() + layerOffsetTop - OFFSET_TOP, 0),
    layerIndex,
    artboard
  )
}

module.exports = createLegendItemIndex;
