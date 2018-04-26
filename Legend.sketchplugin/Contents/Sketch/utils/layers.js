const isSketchStringsEqual = require('./isSketchStringsEqual');

const getLayersCache = layer =>
  Array.from(layer.layers())
    .map(layer => {
      const frame = layer.frame();
      return {
        x: frame.x(),
        y: frame.y(),
        cls: layer.class(),
        layer,
      };
    })
    .sort((a, b) => a.y - b.y || a.x - b.x);

const findLayer = (layer, name) =>
  Array.from(layer.layers()).find(l => isSketchStringsEqual(l.name(), name));

module.exports = {
  getLayersCache,
  findLayer,
};
