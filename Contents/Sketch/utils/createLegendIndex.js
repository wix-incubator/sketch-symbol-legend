const sketch = require('sketch');
const OFFSET_TOP = 15;

const createLegendIndex = ({layer, artboard, depth}) => {
  const rect = new Rectangle(layer.frame().x(), layer.frame().y() - OFFSET_TOP , layer.frame().width(), layer.frame().height());
  const text = new sketch.Text({
    parent: artboard,
    alignment: sketch.Text.Alignment.center,
    text: `(${depth})`,
    frame: rect,
  });
  text.adjustToFit()
};

module.exports = createLegendIndex;
