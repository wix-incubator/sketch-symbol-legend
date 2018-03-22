const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

function getLegendDescription({layer, layerIndex, symbolsDictionary}) {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();

  let description ='('+(layerIndex)+') '+ symbolMaster.name()+'\n';

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