const utils = require('./utils');

const getLoaderProps = (symbolData) => {
  const {symbolMaster, overridedValues} = symbolData;
  const symbolMasterData = utils.getSymbolMasterData(symbolMaster);
  const props = {
    children: overridedValues.Message || "LOADING, PLEASE WAIT...",
  };

  if (symbolMasterData[1]) {
    props.size = symbolMasterData[1].trim().toLowerCase();
  }
  return props
};

module.exports = {
  getLoaderProps
};