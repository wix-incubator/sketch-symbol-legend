const getTextLinkProps = (symbolData) => {
  const {symbolMaster, overridedValues} = symbolData;
  const symbolMasterArray = symbolMaster.name().split('/');
  const symbolMasterData = symbolMasterArray[2].split('+');
  const size =symbolMasterData[1].trim();
  const affixType = overridedValues.Affix && overridedValues.Affix.split('/')[4];
  const iconKey = Object.keys(overridedValues).find(x => x.indexOf('Icon') > -1);
  const props = {
    size,
    type: overridedValues.Type && overridedValues.Type.split('/')[3],
    focus: overridedValues.Focus && overridedValues.Focus.split('/')[4],
    text: overridedValues.Value || "Text Link",
    underlineStyle: (overridedValues.Underline && overridedValues.Underline.split('/')[4].trim() === 'Underline') ? 'always' : 'never',
  }

  if (affixType) {
    props[affixType.trim().toLowerCase()] = iconKey && overridedValues[iconKey].split('/')[3].trim();
  }
  return props
};

module.exports = {
  getTextLinkProps
};