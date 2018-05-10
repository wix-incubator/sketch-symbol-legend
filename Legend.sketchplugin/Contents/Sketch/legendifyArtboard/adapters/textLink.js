const utils = require('./utils');

const getTextLinkProps = (symbolData) => {
  const {symbolMaster, overridedValues} = symbolData;
  const symbolMasterData = utils.getSymbolMasterData(symbolMaster);
  const props = {
    children: overridedValues.Value || "Text Link",
  }

  if (symbolMasterData[1]) {
    props.size = symbolMasterData[1].trim().toLowerCase();
  }

  const affixArr = overridedValues.Affix && overridedValues.Affix.split('/')
  if (affixArr) {
    const affixType = affixArr[4];
    const iconKey = Object.keys(overridedValues).find(x => x.indexOf('Icon') > -1);
    const iconKeyArr = overridedValues[iconKey] && overridedValues[iconKey].split('/');
    if (affixType && iconKey && iconKeyArr && iconKeyArr[3]) {
      const affixTypeLower = affixType.trim().toLowerCase();
      props[affixTypeLower] = iconKeyArr[3].trim().toLowerCase();
    }
  }

  const typeArr = overridedValues.Type && overridedValues.Type.split('/');
  if (typeArr && typeArr[3]) {
    props.type = typeArr[3].toLowerCase();
  }
  const focusArr = overridedValues.Focus && overridedValues.Focus.split('/');
  if (focusArr && focusArr[5]) {
    props.type = focusArr[5].toLowerCase();
  }
  const underlineArr = overridedValues.Underline && overridedValues.Underline.split('/');
  if (underlineArr && underlineArr[4]) {
    props.underlineStyle = underlineArr[4].trim() === 'Underline';
  }
  return props
};

module.exports = {
  getTextLinkProps
};