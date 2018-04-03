function getLegendItemDescription({ layer, layerIndex, symbolsDictionary }) {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();

  const availableOverrideNames = Array
    .from(symbolMaster.availableOverrides())
    .map(override => override.currentValue())
    .map(value => symbolsDictionary[value])
    .map(s => s && s.name())
    .filter(Boolean);

  const defaultOverrides = Array.from(symbolMaster.overridePoints())
    .reduce((defaultOverrides, overridePoint, index) => ({
      ...defaultOverrides,
      [overridePoint.layerID()]: {
        type: overridePoint.layerName(),
        value: availableOverrideNames[index]
      }
    }), {});

  const descriptionParts = [
    `(${layerIndex})  ${symbolMaster.name()}\n`
  ];

  for (let symbolKey in defaultOverrides) {
    const override = overrides[symbolKey];

    if (override && symbolsDictionary[symbolKey]) {
      descriptionParts.push(`          + ${symbolsDictionary[symbolKey].name()}`);

      if (override.symbolID && symbolsDictionary[override.symbolID]) {
        const symbolName = symbolsDictionary[override.symbolID];

        descriptionParts.push(` = ${symbolName.name()}\n`);
      }
    } else {
      let defaultOverride = defaultOverrides[symbolKey];

      if (defaultOverride.value) {
        descriptionParts.push(`          - ${defaultOverride.type} = ${defaultOverride.value}\n`);
      }
    }
  }

  return descriptionParts.join('');
}

module.exports = getLegendItemDescription;
