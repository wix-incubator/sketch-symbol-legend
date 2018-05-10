const utils = require('./utils');

const getBadgeProps = (symbolData) => {
  const {symbolMaster, overridedValues} = symbolData;
  if (utils.isEqualsNone(overridedValues.Type)) {
    return {};
  }

  const props = {
    children: overridedValues.Value || "Badge",
    type: 'solid'
  };

  const symbolMasterData = utils.getSymbolMasterData(symbolMaster);
  if (symbolMasterData[1]) {
    log(symbolMasterData)
    props.type = symbolMasterData[1].trim().toLowerCase();
  }
  if (symbolMasterData[2]) {
    const iconKey = Object.keys(overridedValues).find(x => x.indexOf('Icon') > -1)
    const hasPrefixIcon = symbolMasterData[2].toLowerCase().trim() === "icon prefix";
    if (hasPrefixIcon && overridedValues[iconKey]) {
      const iconValueArr = overridedValues[iconKey].split('/');
      props.prefixIcon = iconValueArr[3] && iconValueArr[3].trim().toLowerCase();
    }
  }

  if (overridedValues.Type) {
    const skinData = overridedValues.Type.toLowerCase().split('/');
    props.skin = skinData[4];
  }

  return props;
};

module.exports = {
  getBadgeProps
};