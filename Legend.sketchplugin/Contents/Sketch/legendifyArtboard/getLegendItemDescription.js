const {getComponentData} = require('./adapters');
const isSketchStringsEqual = require('../utils/isSketchStringsEqual');
const isSketchUndefined = require('../utils/isSketchUndefined');
const {TEXT_LAYER_CLASS_NAME} = require('../constants');

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
  };

  const getTextDescription = (overrideDictionaryValue, override) => {
    if (isSketchUndefined(overrideDictionaryValue.name)) {
      return;
    }

    const valueKey = Object.keys(override)[0];
    if (!valueKey) {
      return;
    }

    return {
      type: overrideDictionaryValue.name(),
      value: override[valueKey],
    };
  };

const getTextLayerValue = (override, symbolsDictionary) => {
  const overrideDictionaryValue = symbolsDictionary[Object.keys(override)[0]];
  const isTextLayer = overrideDictionaryValue && String(overrideDictionaryValue.class()) == TEXT_LAYER_CLASS_NAME;
  return isTextLayer && !isSketchUndefined(overrideDictionaryValue) && overrideDictionaryValue;
}

const getOverrideSymbols = (override, symbolKey, symbolsDictionary) => {
  const symbolDescriptions = [];
  let currentOverride = override;
  let currentKey = symbolKey;
  while (currentOverride) {
    if (currentKey) {
      const symbolDescription = getSymbolDescription(currentKey, currentOverride, symbolsDictionary);
      if (symbolDescription) {
        symbolDescriptions.push(symbolDescription);
        delete currentOverride.symbolID;
      }
      const textLayerValue = getTextLayerValue(currentOverride, symbolsDictionary);
      if (textLayerValue) {
        const textDescription = getTextDescription(textLayerValue, currentOverride);
        symbolDescriptions.push(textDescription);
      }
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
      return [defaultOverrides[defaultOverrideKey], ...overrideSymbols];
    }
    return [defaultOverrides[defaultOverrideKey]];
  })

  const flatten = [].concat.apply([], finalOverrides);
  const returnObject = {};
  flatten.forEach(x => {
    returnObject[x.type] = x.value;
  })

  return returnObject;
}


const getLegendItemDescription = ({ layer, layerIndex, symbolsDictionary }) => {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();
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
