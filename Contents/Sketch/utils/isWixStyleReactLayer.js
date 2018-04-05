const { getLibraryName } = require('../utils/symbol');
const { WIX_STYLE_LIBRARY_NAME } = require('../constants');
const isSketchStringsEqual = require('./isSketchStringsEqual');

module.exports = layer => {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();

  return !!(
    layer.overrides &&
    symbolMaster &&
    isSketchStringsEqual(getLibraryName(symbolMaster), WIX_STYLE_LIBRARY_NAME)
  );
};
