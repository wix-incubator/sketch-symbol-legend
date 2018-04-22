const sketch = require('sketch');
const { Group, Rectangle, Shape, Text } = require('sketch/dom');
const setTextColor = require('../utils/setTextColor');

const WIDTH_PER_DIGIT = 15;
const BADGE_COLOR_OPACITY = 40;
const BADGE_COLOR = '#ff6666';
const BORDER_COLOR = '#ffffff00';
const getDigitsCount = num => num.toString().length;

const createBadgeNode = frame => {
  return new Shape({
    frame,
    style: {
      fills: [BADGE_COLOR],
      borders: [BORDER_COLOR]
    }
  });
}

const createTextNode = (frame, layerIndex) => {
  const textNode = new Text({
    alignment: Text.Alignment.center,
    text: layerIndex.toString(),
    frame,
  });

  setTextColor({
    textNode,
    red: 1,
    green: 1,
    blue: 1,
    alpha: 1,
  });

  textNode.adjustToFit();

  return textNode;
}

module.exports = (x, y, layerIndex) => {
  const dimensions = [ getDigitsCount(layerIndex) * WIDTH_PER_DIGIT, WIDTH_PER_DIGIT ];
  const frame = new Rectangle(0, 0, ...dimensions);

  const groupNode = new Group({
    name: `Badge ${layerIndex}`,
    frame: new Rectangle(x, y, ...dimensions),
    layers: [
      createBadgeNode(frame),
      createTextNode(frame, layerIndex)
    ]
  });

  return [groupNode];
};
