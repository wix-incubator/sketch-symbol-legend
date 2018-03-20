const isSketchStringsEqual = require('./isSketchStringsEqual');
const {
  SYMBOL_INSTANCE_CLASS_NAME,
  SYMBOL_MASTER_CLASS_NAME,
} = require('../constants');

function createSymbolsDictionary(symbols, dictionary = {}) {
  for (let i = 0; i < symbols.count(); i++) {
    const symbol = symbols.objectAtIndex(i);
    if(
      isSketchStringsEqual(symbol.class(), SYMBOL_INSTANCE_CLASS_NAME) ||
      isSketchStringsEqual(symbol.class(), SYMBOL_MASTER_CLASS_NAME)) {
      if (symbol.layers) {
        createSymbolsDictionary(symbol.layers(), dictionary);
      }
      dictionary[symbol.symbolID()] = symbol;
      dictionary[symbol.objectID()] = symbol;
    }
  }

  return dictionary;
}

module.exports = createSymbolsDictionary;
