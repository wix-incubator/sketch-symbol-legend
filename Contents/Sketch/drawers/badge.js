const sketch = require('sketch');
const { Rectangle, Shape } = require('sketch/dom');
const { LEGEND_GROUP_NAME } = require('../constants');

const WIDTH_PER_DIGIT = 15;
const BADGE_COLOR = '#ff6666';
const getDigitsCount = num => num.toString().length;

module.exports = (x, y, layerIndex, parent) => {
  const dimensions = [ getDigitsCount(layerIndex) * WIDTH_PER_DIGIT, WIDTH_PER_DIGIT ];

  const badgeNode = new Shape({
    parent,
    name: LEGEND_GROUP_NAME,
    frame: new Rectangle(x / 2, y / 2, ...dimensions),
    style: {
      fills: [BADGE_COLOR]
    }
  });

  const textNode = new sketch.Text({
    parent,
    alignment: sketch.Text.Alignment.center,
    text: layerIndex.toString(),
    frame: new Rectangle(x, y, ...dimensions)
  });

  textNode.name = LEGEND_GROUP_NAME;

  textNode.adjustToFit();

  return [badgeNode, textNode];
};
