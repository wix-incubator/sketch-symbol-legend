const adjustLayerFrame = (layer, { x, y, width, height }) => {
  const frame = layer.frame();
  if (x) frame.x = x;
  if (y) frame.y = y;
  if (width) frame.width = width;
  if (height) frame.height = height;
};

module.exports = adjustLayerFrame;
