const getBadgeProps = (symbolData) => {
  const {symbolMaster, overridedValues} = symbolData;
  const symbolMasterArray = symbolMaster.name().split('/');
  const symbolMasterData = symbolMasterArray[2].split('+');
  const type =(symbolMasterData[1] && symbolMasterData[1].trim()) || "solid";
  const prefixIcon =symbolMasterData[2] && symbolMasterData[2].trim() === "Icon Prefix";
  const iconKey = Object.keys(overridedValues).find(x => x.indexOf('Icon') > -1)
  const prefixIconValue = prefixIcon && overridedValues[iconKey].split('/')[3].trim();
  const props = {
    type,
    skin: overridedValues.Type.toLowerCase().split('/')[4].trim().split(' ')[1],
    children: overridedValues.Value || "Badge"
  }

  if (prefixIconValue) {
    props.prefixIcon = prefixIconValue.toLowerCase()
  }

  return props;
};

module.exports = {
  getBadgeProps
};