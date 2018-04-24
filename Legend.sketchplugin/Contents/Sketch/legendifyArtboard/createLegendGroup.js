const { Group, Text, Shape, } = require('sketch/dom'); // eslint-disable-line node/no-missing-require
const adjustLegendFrames = require('./adjustLegendFrames');
const { LEGEND_CONTENT_NAME } = require('../constants');

const LEGEND_GROUP_BACKGROUND = '#ffffff';

const createLegendGroup = ({ artboard, legendItems }) => {
  const legendGroup = new Group({
    parent: artboard,
    name: String(LEGEND_CONTENT_NAME)
  });

  const legendGroupBackground = new Shape({
    name: 'Background',
    parent: legendGroup,
    style: {
      fills: [LEGEND_GROUP_BACKGROUND],
    },
  });

  const legendGroupItems = new Text({
    parent: legendGroup,
    text: legendItems.join('\n\n'),
    fixedWidth: false,
  });

  adjustLegendFrames(artboard, legendGroup, legendGroupBackground, legendGroupItems);

  return legendGroup;
}

module.exports = createLegendGroup;
