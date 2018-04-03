function getLegendItemDescription({ layer, layerIndex, symbolsDictionary }) {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();

  let description = `${symbolMaster.name()}\n`;

  for (let symbolKey in overrides) {
    const override = overrides[symbolKey];

    if (symbolsDictionary[symbolKey]) {
      description += `        ${symbolsDictionary[symbolKey].name()}`;

      const { symbolID } = override;

      if (symbolID && symbolsDictionary[symbolID]) {
        const symbolName = symbolsDictionary[symbolID];
        description += ` = ${symbolName.name()}\n`;
      }
    }
  }

  return {
    layerIndex,
    description,
  };
}

module.exports = getLegendItemDescription;
