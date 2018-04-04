const { getLibraryName } = require('../utils/symbol');
const { WIX_STYLE_LIBRARY_NAME } = require('../constants');

module.exports = layer => {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();

  return !!(
    layer.overrides &&
    symbolMaster &&
    isSketchStringsEqual(getLibraryName(symbolMaster), WIX_STYLE_LIBRARY_NAME)
  );
};
