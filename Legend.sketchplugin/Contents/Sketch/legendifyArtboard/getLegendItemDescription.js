function getLegendItemDescription({ layer, layerIndex, symbolsDictionary }) {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();

  const availableOverrideNames = Array
    .from(symbolMaster.availableOverrides())
    .reduce((names, override) => {
      const symbol = symbolsDictionary[override.currentValue()];
      const name = symbol && symbol.name();
      return name ? [...names, name] : names;
    }, []);

  const defaultOverrides = Array
    .from(symbolMaster.overridePoints())
    .reduce((defaultOverrides, overridePoint, index) => (Object.assign(
      {},
      defaultOverrides,
      {
        [overridePoint.layerID()]: {
          type: overridePoint.layerName(),
          value: availableOverrideNames[index]
        }
      }
    )), {});

  return Object.keys(defaultOverrides)
    .reduce((descriptionParts, symbolKey) => {
      const override = overrides[symbolKey];

      if (override && symbolsDictionary[symbolKey]) {
        descriptionParts = [...descriptionParts, `          + ${symbolsDictionary[symbolKey].name()}`];
        const symbol = override.symbolID && symbolsDictionary[override.symbolID];
        return symbol ?
          [...descriptionParts, ` = ${symbol.name()}\n`] :
          descriptionParts;
      }

      const defaultOverride = defaultOverrides[symbolKey];

      return defaultOverride.value ?
        [...descriptionParts, `          - ${defaultOverride.type} = ${defaultOverride.value}\n`] :
        descriptionParts;
    }, [`(${layerIndex})  ${symbolMaster.name()}\n`])
    .join('');
}

module.exports = getLegendItemDescription;
