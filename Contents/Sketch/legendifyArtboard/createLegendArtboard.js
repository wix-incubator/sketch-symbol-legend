const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const { LEGEND_ARTBOARD_NAME } = require('../constants');

const LEGEND_PADDING = 20;
const ARTBOARD_MARGIN = 30;
const LEGEND_ARTBOARD_MARGIN = 50;

function isNotArtboardAndLegend(artboard) {
  const name = String(artboard.name());
  const legendName = `${name}~Legend`;
  const ignoreNames = [name, legendName];
  return otherArtboard => !ignoreNames.includes(String(otherArtboard.name()));
}

function getArtboardsBelow({artboard, page}) {
  page = page || artboard.parentGroup();
  const frame = artboard.frame();
  const x = frame.x();
  const y = frame.y();
  const width = frame.width();
  const height = frame.height();

  const otherArtboards = Array.from(page.artboards()).filter(isNotArtboardAndLegend(artboard));

  const artboardsBelow = otherArtboards.reduce((acc, otherArtboard) => {
    const otherFrame = otherArtboard.frame();
    const otherX = otherFrame.x();
    const otherY = otherFrame.y();
    const otherWidth = otherFrame.width();
    const otherHeight = otherFrame.height();

    const otherInXRange = otherX + otherWidth > x && otherX < x + width;
    const otherBelow = otherY > y + height;

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

  return artboardsBelow;
}

function createLegendArtboard({ artboard, page, legendItems }) {
  const artboardFrame = artboard.frame();
  const artboardHeight = artboardFrame.height();
  const artboardWidth = artboardFrame.width();
  const artboardX = artboardFrame.x();
  const artboardY = artboardFrame.y();

  const legendArtboard = new sketch.Artboard({
    parent: page || artboard.parentGroup(),
    name: artboard.name() + String(LEGEND_ARTBOARD_NAME),
    flowStartPoint: true,
    frame: new Rectangle(artboardX, artboardY + artboardHeight + ARTBOARD_MARGIN),
  });

  const legendArtboardItems = new sketch.Text({
    parent: legendArtboard,
    text: legendItems.join('\n\n'),
    frame: new Rectangle(LEGEND_PADDING, LEGEND_PADDING),
    fixedWidth: false,
  });

  legendArtboardItems._object.setIsLocked(true);

  const legendArtboardFrame = legendArtboard._object.frame();
  const legendArtboardItemsFrame = legendArtboardItems._object.frame();

  legendArtboardItems._object.setTextBehaviour(1); // 1 = auto
  legendArtboardItemsFrame.width = artboardWidth - LEGEND_PADDING * 2;
  const legendArtboardHeight = legendArtboardItemsFrame.height() + LEGEND_PADDING * 2;
  legendArtboardFrame.width = artboardWidth;
  legendArtboardFrame.height = legendArtboardHeight;

  const artboardsBelow = getArtboardsBelow({page, artboard});

  if (artboardsBelow.length) {
    const closestArtboard = artboardsBelow[0].artboard;
    const closestArtboardFrame = closestArtboard.frame();
    const closestArtboardY = closestArtboardFrame.y();
    const legendArtboardY = legendArtboardFrame.y();
    if (closestArtboardY < legendArtboardY + legendArtboardHeight) {
      const delta = Math.abs(closestArtboardY - (legendArtboardY + legendArtboardHeight));
      artboardsBelow.forEach(a => {
        const frame = a.artboard.frame();
        frame.y = frame.y() + delta + LEGEND_ARTBOARD_MARGIN;
      });
    }
  }

  return legendArtboard;
}

module.exports = createLegendArtboard;
