const getLoaderProps = (symbolData) => {
  const {symbolMaster} = symbolData;
  const symbolMasterArray = symbolMaster.name().split('/');
  const symbolMasterData = symbolMasterArray[2].split('+');
  const size =symbolMasterData[1].trim();
  const hasText = !symbolMasterData[2];

  return {
    props: {
      size,
      hasText
    }
  }
}

module.exports = {
  getLoaderProps
}