//SOURCE: https://github.com/zhifengkoh/resize_artboard/

function adjustArtboardHeight(artboard) {
  const layers = artboard.layers();
  if (layers.count() == 0) {
    return;
  }

  let boundaryVarsInitialized = false;
  let layer;
  let r;
  let minX;
  let minY;
  let maxX;
  let maxY;

  for (let i = 0; i < layers.count(); i++) {
    layer = layers.objectAtIndex(i);
    if (layer.isVisible()) {
      r = layer.rect();

      if (!boundaryVarsInitialized) {
        minX = getLeftEdge(r);
        minY = getTopEdge(r);
        maxX = getRightEdge(r);
        maxY = getBottomEdge(r);
        boundaryVarsInitialized = true;
      }

      const leftEdge = getLeftEdge(r);
      const rightEdge = getRightEdge(r);
      const topEdge = getTopEdge(r);
      const bottomEdge = getBottomEdge(r);

      if (leftEdge < minX) minX = leftEdge;
      if (rightEdge > maxX) maxX = rightEdge;
      if (topEdge < minY) minY = topEdge;
      if (bottomEdge > maxY) maxY = bottomEdge;
    }
  }

  //Resize the artboard
  const rect = artboard.rect();
  rect.size.width = (maxX - minX);
  rect.size.height = (maxY - minY);
  artboard.setRect(rect);
}

function setArtboardHeight(artboard, height) {
  const rect = artboard.rect();
  rect.size.height =height;
  artboard.setRect(rect);
}

function getLeftEdge(cgrect) {
  return cgrect.origin.x;
}
function getRightEdge(cgrect) {
  return cgrect.origin.x + cgrect.size.width;
}
function getTopEdge(cgrect) {
  return cgrect.origin.y;
}
function getBottomEdge(cgrect) {
  return cgrect.origin.y + cgrect.size.height;
}

module.exports = {
  adjustArtboardHeight,
  setArtboardHeight
};

