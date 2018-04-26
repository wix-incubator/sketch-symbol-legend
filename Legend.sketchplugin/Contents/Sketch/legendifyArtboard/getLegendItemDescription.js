const isSketchStringsEqual = require('../utils/isSketchStringsEqual');

const getSymbolDescription = (symbolKey, override, symbolsDictionary) => {
  const symbolID = override && override.symbolID;
  if (!symbolID) return;

  const attribute = symbolsDictionary[symbolKey];
  if (!attribute) return;

  const value = symbolsDictionary[symbolID];
  if (!value) return;

  return `          + ${attribute.name()} = ${value.name()}\n`;
};

const getSymbolKey = override =>
  Object.keys(override).find(key => !isSketchStringsEqual(key, 'symbolID'));

const getOverrideSymbols = (override, symbolKey, symbolsDictionary) => {
  const symbolDescriptions = [];
  let currentOverride = override;
  let currentKey = symbolKey;

  while (currentOverride) {
    if (currentKey) {
      symbolDescriptions.push(getSymbolDescription(currentKey, currentOverride, symbolsDictionary));
    }
    currentKey = getSymbolKey(currentOverride);
    currentOverride = currentOverride[currentKey];
  }

  return symbolDescriptions.filter(Boolean);
};

const getLegendItemDescription = ({ layer, layerIndex, symbolsDictionary }) => {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();

  const availableOverrideNames = Array.from(symbolMaster.availableOverrides()).reduce(
    (names, override) => {
      const symbol = symbolsDictionary[override.currentValue()];
      const name = symbol && symbol.name();
      return name ? [...names, name] : names;
    },
    []
  );

  const defaultOverrides = Array.from(symbolMaster.overridePoints()).reduce(
    (defaultOverrides, overridePoint, index) =>
      Object.assign({}, defaultOverrides, {
        [overridePoint.layerID()]: {
          type: overridePoint.layerName(),
          value: availableOverrideNames[index],
        },
      }),
    {}
  );

  return Object.keys(defaultOverrides)
    .reduce(
      (descriptionParts, symbolKey) => {
        const override = overrides[symbolKey];

        if (override && symbolsDictionary[symbolKey]) {
          descriptionParts = [...descriptionParts];
          return [
            ...descriptionParts,
            ...getOverrideSymbols(override, symbolKey, symbolsDictionary),
          ];
        }

        const defaultOverride = defaultOverrides[symbolKey];

        return defaultOverride.value
          ? [
              ...descriptionParts,
              `          - ${defaultOverride.type} = ${defaultOverride.value}\n`,
            ]
          : descriptionParts;
      },
      [`(${layerIndex})  ${symbolMaster.name()}\n`]
    )
    .join('');
};

module.exports = getLegendItemDescription;
