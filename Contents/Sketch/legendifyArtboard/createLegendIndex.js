const drawBadge = require('../drawers/badge');

const OFFSET_TOP = 15;

function createLegendItemIndex({
  layer,
  layerIndex,
  layerOffsetLeft,
  layerOffsetTop,
  parent
}) {
  const frame = layer.frame();

  return drawBadge(
    frame.x() + layerOffsetLeft,
    Math.max(frame.y() + layerOffsetTop - OFFSET_TOP, 0),
    layerIndex,
    parent
  )
}

module.exports = createLegendItemIndex;
