function getLegendItemDescription({ layer, layerIndex, symbolsDictionary }) {
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

module.exports = getLegendItemDescription;
