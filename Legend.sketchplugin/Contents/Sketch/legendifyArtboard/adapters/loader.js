const getLoaderProps = (symbolData) => {
  const {symbolMaster, overridedValues} = symbolData;
  const symbolMasterArray = symbolMaster.name().split('/');
  const symbolMasterData = symbolMasterArray[2].split('+');
  const size =symbolMasterData[1].trim();
  return {
      size,
      text: overridedValues.Message || "LOADING, PLEASE WAIT...",
    }
};

module.exports = {
  getLoaderProps
};