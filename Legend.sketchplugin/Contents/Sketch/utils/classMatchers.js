const { ARTBOARD_GROUP_CLASS_NAME, SYMBOL_INSTANCE_CLASS_NAME } = require('../constants');
const isSketchStringsEqual = require('./isSketchStringsEqual');

const isClass = className => layer => isSketchStringsEqual(layer.class(), className);

const isSymbol = isClass(SYMBOL_INSTANCE_CLASS_NAME);

const isArtboard = isClass(ARTBOARD_GROUP_CLASS_NAME);

module.exports = {
  isSymbol,
  isArtboard,
};
