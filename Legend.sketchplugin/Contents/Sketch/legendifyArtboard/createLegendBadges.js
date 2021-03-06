const { Group, Rectangle } = require('sketch/dom'); // eslint-disable-line node/no-missing-require

const { LEGEND_BADGES_NAME } = require('../constants');
const drawBadge = require('../drawers/badge');

const OFFSET_TOP = 15;

const createLegendBadge = ({ layer, layerIndex, layerOffsetLeft, layerOffsetTop }) => {
  const frame = layer.frame();

  return drawBadge(frame.x() + layerOffsetLeft, Math.max(frame.y() + layerOffsetTop - OFFSET_TOP, 0), layerIndex);
};

const createLegendBadgesGroup = (artboard, badges) => {
  const artboardFrame = artboard.frame();
  const legendBadgesGroup = new Group({
    name: LEGEND_BADGES_NAME,
    parent: artboard,
    frame: new Rectangle(0, 0, artboardFrame.width(), artboardFrame.height()),
    layers: badges,
  });
  legendBadgesGroup._object.setIsLocked(true);
  return legendBadgesGroup;
};

module.exports = {
  createLegendBadge,
  createLegendBadgesGroup,
};
