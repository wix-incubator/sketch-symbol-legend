const {getComponentData} = require('./adapters');
const isSketchStringsEqual = require('../utils/isSketchStringsEqual');


const getSymbolKey = override =>
  Object.keys(override).find(key => !isSketchStringsEqual(key, 'symbolID'));

  const getSymbolDescription = (symbolKey, override, symbolsDictionary) => {
    const symbolID = override && override.symbolID;
    if (!symbolID) return;

    const attribute = symbolsDictionary[symbolKey];
    if (!attribute) return;

    const value = symbolsDictionary[symbolID];
    if (!value) return;
    return {
      type: attribute.name(),
      value: value.name()
    };
    // return `          + ${attribute.name()} = ${value.name()}\n`;
  };

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


const getOverridesValues = (symbolMaster, symbolsDictionary, overrides) => {
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

  const finalOverrides = Object.keys(defaultOverrides).map(defaultOverrideKey => {
    const override = overrides[defaultOverrideKey];
    if (override && symbolsDictionary[defaultOverrideKey]) {
      const overrideSymbols = getOverrideSymbols(override, defaultOverrideKey, symbolsDictionary);
      return overrideSymbols[0] || defaultOverrides[defaultOverrideKey];
    }
    return  defaultOverrides[defaultOverrideKey];
  })

  const returnObject = {};
  log({finalOverrides})
  finalOverrides.forEach(x => {
    returnObject[x.type] = x.value;
  })

  return returnObject;
}


const getLegendItemDescription = ({ layer, layerIndex, symbolsDictionary }) => {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();
  log({overrides})
  const componentName = symbolMaster.name().split('/')[1].trim();
  const overridedValues = getOverridesValues(symbolMaster, symbolsDictionary, overrides)
  const data = getComponentData(componentName, {symbolMaster, symbolsDictionary, overridedValues});
  const propsArr = Object.keys(data).map(x=> {
    return `- ${x}: ${data[x]}`
  });
  propsArr.push('\n');
  return [`(${layerIndex}) ${componentName}`].concat(propsArr).join('\n');
};

module.exports = getLegendItemDescription;
