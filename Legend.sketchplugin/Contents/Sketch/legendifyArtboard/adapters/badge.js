const isSketchStringsEqual = require('../../utils/isSketchStringsEqual');
const getBadgeProps = (symbolData) => {
  const {symbolMaster, overridedValues} = symbolData;
  if (isSketchStringsEqual(overridedValues.Type, "None")) {
    return {};
  }
  const symbolMasterArray = symbolMaster.name().split('/');
  const symbolMasterData = symbolMasterArray[2].split('+');
  let type;
  if (symbolMasterData.length > 1) {
    type =symbolMasterData[1] && symbolMasterData[1].trim().toLowerCase() || "solid";
  }
  const prefixIcon =symbolMasterData[2] && symbolMasterData[2].trim() === "Icon Prefix";
  const iconKey = Object.keys(overridedValues).find(x => x.indexOf('Icon') > -1)
  const prefixIconValue = prefixIcon && overridedValues[iconKey].split('/')[3].trim();

  let skin;
  const skinData = overridedValues.Type && overridedValues.Type.toLowerCase().split('/')[4];
  if (skinData){
    skin = skinData.trim().split(' ')[1]
  }

  const props = {
    children: overridedValues.Value || "Badge"
  }

  if (type) {
    props.type = type
  }
  if (skin) {
    props.skin = skin
  }
  if (prefixIconValue) {
    props.prefixIcon = prefixIconValue.toLowerCase()
  }

  return props;
};

module.exports = {
  getBadgeProps
};