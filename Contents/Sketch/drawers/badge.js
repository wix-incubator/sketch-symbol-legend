const sketch = require('sketch');
const { Rectangle, Shape, Style, Text } = require('sketch/dom');
const setTextColor = require('../utils/setTextColor');

const WIDTH_PER_DIGIT = 15;
const BADGE_COLOR_OPACITY = 40;
const BADGE_COLOR = '#ff6666';
const BORDER_COLOR = '#ffffff00';
const getDigitsCount = num => num.toString().length;

module.exports = (x, y, layerIndex) => {
  const dimensions = [ getDigitsCount(layerIndex) * WIDTH_PER_DIGIT, WIDTH_PER_DIGIT ];

  const badgeNode = new Shape({
    frame: new Rectangle(x / 2, y / 2, ...dimensions),
    style: {
      fills: [BADGE_COLOR],
      borders: [BORDER_COLOR]
    }
  });

  const textNode = new Text({
    alignment: Text.Alignment.center,
    text: layerIndex.toString(),
    frame: new Rectangle(x, y, ...dimensions)
  });

  setTextColor({
    textNode,
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
  });

  textNode.adjustToFit();

  return [badgeNode, textNode];
};
