const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

function getLegendDescription({layer, layerIndex, symbolsDictionary}) {
  const overrides = layer.overrides();
  let description ='('+(layerIndex)+') '+layer.name()+'\n';

  for (const symbolKey in overrides) {
    if (symbolsDictionary[symbolKey]) {
      description += '        ' + symbolsDictionary[symbolKey].name();

      if (overrides[symbolKey].symbolID) {
        const symbolName = symbolsDictionary[overrides[symbolKey].symbolID];

        description += ` = ${symbolName.name()}\n`;
      }
    }
  }

  return description;
}

function createLegendItem({layer, layerIndex, legendArtboard, symbolsDictionary, offsetTop}) {
  const rect = new Rectangle(0, offsetTop, 200, 200);
  const text = new sketch.Text({
    parent: legendArtboard,
    text: getLegendDescription({layer, layerIndex, symbolsDictionary}),
    frame: rect,
  });

  return text;
}

module.exports = createLegendItem;