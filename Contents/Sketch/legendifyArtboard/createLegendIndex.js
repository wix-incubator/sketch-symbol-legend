const drawBadge = require('../drawers/badge');

const OFFSET_TOP = 15;

function createLegendItemIndex({
  layer,
  layerIndex,
  layerOffsetLeft,
  layerOffsetTop,
}) {
  const frame = layer.frame();

  return drawBadge(
    frame.x() + layerOffsetLeft,
    Math.max(frame.y() + layerOffsetTop - OFFSET_TOP, 0),
    layerIndex,
  )
}

module.exports = createLegendItemIndex;
