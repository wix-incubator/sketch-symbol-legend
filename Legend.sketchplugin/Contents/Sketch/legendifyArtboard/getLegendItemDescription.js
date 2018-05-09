const {getComponentData} = require('./adapters');
const isSketchStringsEqual = require('../utils/isSketchStringsEqual');
const isSketchUndefined = require('../utils/isSketchUndefined');
const {TEXT_LAYER_CLASS_NAME} = require('../constants');

  const getSymbolDescription = (symbolKey, override, symbolsDictionary) => {
    const isNoneValue = (symbolID) => isSketchStringsEqual(symbolID, "" );
    const symbolID = override && override.symbolID;
    if (!symbolID) return;

    const attribute = symbolsDictionary[symbolKey];
    if (!attribute) return;

    const value = isNoneValue(symbolID) ? "None" : symbolsDictionary[symbolID];
    log({value, attribute, symbolKey, override});
    if (!value) return;

    return {
      type: attribute.name(),
      value: !isSketchUndefined(value.name) ? value.name() : value
    };
  };

  const getTextDescription = (overrideDictionaryValue, override) => {
    if (isSketchUndefined(overrideDictionaryValue.name)) {
      return;
    }

    return {
      type: overrideDictionaryValue.name(),
      value: override,
    };
  };

const getTextLayerValue = (currentKey, override, symbolsDictionary) => {
  const overrideDictionaryValue = symbolsDictionary[currentKey];
  const isTextLayer = overrideDictionaryValue && isSketchStringsEqual(overrideDictionaryValue.class(), TEXT_LAYER_CLASS_NAME);
  return isTextLayer && !isSketchUndefined(overrideDictionaryValue) && overrideDictionaryValue;
};

const getOverrideSymbols = (currentOverride , currentKey, symbolsDictionary, symbolDescriptions = []) => {
  if (currentOverride) {
    if (currentKey) {
      const symbolDescription = getSymbolDescription(currentKey, currentOverride, symbolsDictionary);
      if (symbolDescription) {
        symbolDescriptions.push(symbolDescription);
      }

      const textLayerValue = getTextLayerValue(currentKey, currentOverride, symbolsDictionary);
      if (textLayerValue) {
        const textDescription = getTextDescription(textLayerValue, currentOverride);
        symbolDescriptions.push(textDescription);
      }
  }
    Object.keys(currentOverride)
      .filter(key=> !isSketchStringsEqual(key, 'symbolID'))
      .forEach(key => {
        getOverrideSymbols(currentOverride[key], key, symbolsDictionary, symbolDescriptions);
    })
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
    (defaultOverrides, overridePoint, index) => {
      return Object.assign({}, defaultOverrides, {
        [overridePoint.layerID()]: {
          type: overridePoint.layerName(),
          value: availableOverrideNames[index],
        },
      })
    }, {}
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

const getComponentName = (symbolMaster) =>{
  let componentName = symbolMaster.name();
  if (componentName .split('/').length > 2){
    componentName = componentName.split('/')[1].trim();
  }
  return componentName;
}
const getLegendItemDescription = ({ layer, layerIndex, symbolsDictionary }) => {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const overrides = layer.overrides();
  const componentName = getComponentName(symbolMaster);
  const overridedValues = getOverridesValues(symbolMaster, symbolsDictionary, overrides)
  const data = getComponentData(componentName, {symbolMaster, symbolsDictionary, overridedValues});
  const propsArr = Object.keys(data).map(x=> {
    return `- ${x}: ${data[x]}`
  });
  propsArr.push('\n');
  return [`(${layerIndex}) ${componentName}`].concat(propsArr).join('\n');
};

module.exports = getLegendItemDescription;
