const isSketchStringsEqual = require('../../utils/isSketchStringsEqual');

const isEqualsNone = (value) => {
  return isSketchStringsEqual(value, "None");
}

const getSymbolMasterData = (symbolMaster) => {
  const name = symbolMaster.name();
  if (!name) {
    return [];
  }
  const nameArr = name.split('/');
  if (nameArr[2]) {
    return nameArr[2].split('+');
  }
  return [];
}

module.exports = {
  isEqualsNone,
  getSymbolMasterData
}