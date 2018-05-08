const isSketchStringsEqual = require('./isSketchStringsEqual');
const isSketchUndefined = require('./isSketchUndefined');
const { SYMBOL_INSTANCE_CLASS_NAME, SYMBOL_MASTER_CLASS_NAME, TEXT_LAYER_CLASS_NAME  } = require('../constants');

function createSymbolsDictionary(symbols, dictionary = {}) {
  for (let i = 0; i < symbols.count(); i++) {
    const symbol = symbols.objectAtIndex(i);
    const cls = symbol.class();
    if (
      isSketchStringsEqual(cls, SYMBOL_INSTANCE_CLASS_NAME) ||
      isSketchStringsEqual(cls, SYMBOL_MASTER_CLASS_NAME) || isSketchStringsEqual(cls, TEXT_LAYER_CLASS_NAME )
    ) {
      if (symbol.layers) {
        createSymbolsDictionary(symbol.layers(), dictionary);
      }
      if(!isSketchUndefined(symbol.symbolID)){
        dictionary[symbol.symbolID()] = symbol;
      }
      if(!isSketchUndefined(symbol.objectID)){
        dictionary[symbol.objectID()] = symbol;
      }
    }
  }

  return dictionary;
}

module.exports = createSymbolsDictionary;
