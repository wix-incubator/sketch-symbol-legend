const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const LEGEND_ITEM_PADDING = 15;

function getLegendDescription({ layer, layerIndex, symbolsDictionary }) {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();

  let description = '(' + layerIndex + ') ' + symbolMaster.name() + '\n';

  for (const symbolKey in overrides) {
    const override = overrides[symbolKey];

    if (symbolsDictionary[symbolKey]) {
      description += '        ' + symbolsDictionary[symbolKey].name();

      if (override.symbolID && symbolsDictionary[override.symbolID]) {
        const symbolName = symbolsDictionary[override.symbolID];

        description += ` = ${symbolName.name()}\n`;
      }
    }
  }

  return description;
}

function createLegendItem({legendArtboard, description}) {
  const rect = new Rectangle(
    0,
    0,
    200,
    200
  );
  const text = new sketch.Text({
    parent: legendArtboard,
    text: description,
    frame: rect,
  });
  text._object.setIsLocked(true);
  return text;
}

module.exports = {
  createLegendItem,
  getLegendDescription
};
