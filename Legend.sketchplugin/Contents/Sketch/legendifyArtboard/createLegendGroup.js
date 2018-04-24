const { Group, Text } = require('sketch/dom'); // eslint-disable-line node/no-missing-require
const adjustLegendFrames = require('./adjustLegendFrames');
const { LEGEND_CONTENT_NAME } = require('../constants');

const createLegendGroup = ({ artboard, legendItems }) => {
  const legendGroup = new Group({
    parent: artboard,
    name: String(LEGEND_CONTENT_NAME)
  });

  const legendGroupItems = new Text({
    parent: legendGroup,
    text: legendItems.join('\n\n'),
    fixedWidth: false,
  });

  adjustLegendFrames(artboard, legendGroup, legendGroupItems);

  return legendGroup;
}

module.exports = createLegendGroup;
