const sketch = require('sketch');
const { Rectangle, Shape } = require('sketch/dom');
const { LEGEND_BADGE_NAME } = require('../constants');

const WIDTH_PER_DIGIT = 15;
const BADGE_COLOR_OPACITY = 40;
const BADGE_COLOR = `#3899ec${BADGE_COLOR_OPACITY}`;
const getDigitsCount = num => num.toString().length;

module.exports = (x, y, parent, layerIndex) => {
  const dimensions = [ getDigitsCount(layerIndex) * WIDTH_PER_DIGIT, WIDTH_PER_DIGIT ];

  const badgeNode = new Shape({
    parent,
    frame: new Rectangle(x / 2, y / 2, ...dimensions),
    style: {
      fills: [BADGE_COLOR],
      borders: [BADGE_COLOR]
    }
  });

  const textNode = new sketch.Text({
    parent,
    alignment: sketch.Text.Alignment.center,
    text: layerIndex.toString(),
    frame: new Rectangle(x, y, ...dimensions)
  });

  textNode.adjustToFit();

  [badgeNode, textNode]
    .forEach(item => {
      // NOTE: name is required to identify these nodes on cleanup.
      item.name = LEGEND_BADGE_NAME;
      item._object.setIsLocked(true);
    });
};
