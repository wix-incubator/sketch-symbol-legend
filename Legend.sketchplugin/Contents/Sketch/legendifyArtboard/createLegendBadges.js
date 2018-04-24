const { Group, Rectangle } = require('sketch/dom'); // eslint-disable-line node/no-missing-require

const { LEGEND_BADGES_NAME } = require('../constants');
const drawBadge = require('../drawers/badge');

const OFFSET_TOP = 15;

const createLegendBadge = ({ layer, layerIndex, layerOffsetLeft, layerOffsetTop }) => {
  const frame = layer.frame();

  return drawBadge(frame.x() + layerOffsetLeft, Math.max(frame.y() + layerOffsetTop - OFFSET_TOP, 0), layerIndex);
};

const createLegendBadgesGroup = artboard => {
  const artboardFrame = artboard.frame();
  return new Group({
    name: LEGEND_BADGES_NAME,
    parent: artboard,
    frame: new Rectangle(0, 0, artboardFrame.width(), artboardFrame.height()),
  });
};

module.exports = {
  createLegendBadge,
  createLegendBadgesGroup,
};
