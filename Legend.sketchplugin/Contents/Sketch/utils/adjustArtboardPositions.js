const isSketchStringsEqual = require('./isSketchStringsEqual');
const { isArtboard } = require('./classMatchers');

const adjustArtboardPosition = artboard => {
  const currentPage = artboard.parentGroup();
  const frame = artboard.frame();
  const x = frame.x();
  const y = frame.y();
  const width = frame.width();
  const height = frame.height();

  const otherArtboards = Array.from(currentPage.artboards()).filter(otherArtboard =>
    !isSketchStringsEqual(artboard.name(), otherArtboard.name())
  );

  const artboardsBelow = otherArtboards.reduce((acc, otherArtboard) => {
    const otherFrame = otherArtboard.frame();
    const otherX = otherFrame.x();
    const otherY = otherFrame.y();
    const otherWidth = otherFrame.width();

    const otherInXRange = otherX + otherWidth > x && otherX < x + width;
    log(`x ${x}`);
    log(`width ${width}`);
    log(`otherX ${otherX}`);
    log(`otherWidth ${otherWidth}`);
    const otherBelow = otherY > y + height;
    log(`y ${y}`);
    log(`otherY ${otherY}`);
    log(`height ${height}`);

    if (otherInXRange && otherBelow) {
      acc.push({
        name: String(otherArtboard.name()),
        distanceY: Math.abs(y + height - otherY),
        artboard: otherArtboard
      });
    }

    return acc;
  }, []);

  artboardsBelow.sort((a, b) => {
    return a.distanceY - b.distanceY;
  });

  if (artboardsBelow.length) {
    const closestArtboard = artboardsBelow[0].artboard;
    const closestArtboardFrame = closestArtboard.frame();
    const closestArtboardY = closestArtboardFrame.y();
    const artboardFrame = artboard.frame();
    const legendArtboardBottom = artboardFrame.y() + artboardFrame.height();
    if (closestArtboardY < legendArtboardBottom) {
      const delta = Math.abs(closestArtboardY - (legendArtboardBottom));
      artboardsBelow.forEach(a => {
        const frame = a.artboard.frame();
        frame.y = frame.y() + delta;
      });
    }
  }
}

const adjustArtboardPositions = artboards => {
  const artboardRows = [];
  Array.from(artboards)
    .filter(isArtboard)
    .forEach(artboard => {
      log(artboard.name());
    })
}

module.exports = adjustArtboardPositions;
