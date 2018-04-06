const settings = require('../utils/settings');
const { getLibraryName } = require('../utils/symbol');
const isSketchStringsEqual = require('./isSketchStringsEqual');

module.exports = layer => {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const activeLibName = settings.getActiveLibName();

  return !!(
    layer.overrides &&
    symbolMaster &&
    isSketchStringsEqual(getLibraryName(symbolMaster), activeLibName)
  );
};
