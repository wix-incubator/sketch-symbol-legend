const getBadgeProps = (symbolData) => {
  const {symbolMaster, overridedValues} = symbolData;
  const symbolMasterArray = symbolMaster.name().split('/');
  const symbolMasterData = symbolMasterArray[2].split('+');
  const type =symbolMasterData[1] && symbolMasterData[1].trim();
  const prefixIcon =symbolMasterData[2] && symbolMasterData[2].trim() === "Icon Prefix";
  const iconKey = Object.keys(overridedValues).find(x => x.indexOf('Icon') > -1)
  return {
    type,
    skin: overridedValues.Type.split('/')[4].trim(),
    prefixIcon: prefixIcon && overridedValues[iconKey].split('/')[3].trim(),
    text: overridedValues.Value || "Badge"
  }
};

module.exports = {
  getBadgeProps
};