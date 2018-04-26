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

module.exports = {
  getLayersCache,
};
