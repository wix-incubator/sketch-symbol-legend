const getLoaderProps = (symbolData) => {
  const {symbolMaster, overrides} = symbolData;
  const symbolMasterArray = symbolMaster.name().split('/');
  const symbolMasterData = symbolMasterArray[2].split('+');
  const size =symbolMasterData[1].trim();
  let message = '';
  const overridesDataKey = Object.keys(overrides)[0];
  if (overridesDataKey) {
    const overridesData = overrides[overridesDataKey];
    const messageKey = Object.keys(overridesData).find(x => x.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i));
    message = messageKey && overridesData[messageKey];
    }

  return {
    props: {
      size,
      text: message
    }
  }
}

module.exports = {
  getLoaderProps
}