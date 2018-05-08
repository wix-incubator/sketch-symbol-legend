const {getComponentData} = require('./adapters');
const isSketchStringsEqual = require('../utils/isSketchStringsEqual');

const getSymbolKey = override =>
  Object.keys(override).find(key => !isSketchStringsEqual(key, 'symbolID'));

  const getSymbolDescription = (symbolKey, override, symbolsDictionary) => {
    const symbolID = override && override.symbolID;
    // if (!symbolID) return;

    const attribute = symbolsDictionary[symbolKey];
    if (!attribute) return;
    log('************ ATTRIBUTE');
    log(attribute.name());
    const value = symbolsDictionary[symbolID] || attribute;
    log(value)
    log(value.name() === attribute.name());
    if (!value) return;

    return {
      type: attribute.name(),
      value: value.name() === attribute.name() ?override :  value.name()
    };
  };

// const getSymbolText = (override) => {
//   const textKey = Object.keys(override).find(x => x.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
//   if (override[textKey]) {
//     return {
//       type: "text",
//       value:override[textKey]
//     }
//   }
// }

const getOverrideSymbols = (override, symbolKey, symbolsDictionary) => {
  const symbolDescriptions = [];
  let currentOverride = override;
  let currentKey = symbolKey;
  while (currentOverride) {
    if (currentKey) {
      log('CURRENT KEY');
      log(currentKey);
      symbolDescriptions.push(getSymbolDescription(currentKey, currentOverride, symbolsDictionary));
      // const text = getSymbolText(currentOverride)
      // if (text){
      //   symbolDescriptions.push(text);
      // }
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

  log({defaultOverrides})
  const finalOverrides = Object.keys(defaultOverrides).map(defaultOverrideKey => {
    const override = overrides[defaultOverrideKey];
    log({override });
    log(symbolsDictionary["8EDC973E-36F5-4E4D-AFCB-90549B6BC4E6"]);
    if (override && symbolsDictionary[defaultOverrideKey]) {
      const overrideSymbols = getOverrideSymbols(override, defaultOverrideKey, symbolsDictionary);
      return [defaultOverrides[defaultOverrideKey], ...overrideSymbols];
    }
    return [defaultOverrides[defaultOverrideKey]];
  })


log({finalOverrides})
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
  log('************* OVERRIDES');
  log(overrides);
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
