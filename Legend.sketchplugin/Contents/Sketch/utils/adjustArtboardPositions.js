const adjustLayerFrame = require('./adjustLayerFrame');
const { isArtboard } = require('./classMatchers');

const SAME_ROW_THRESHOLD = 100;
const ROW_MARGIN = 100;

const isBetween = (base, value) =>
  base - SAME_ROW_THRESHOLD < value && base + SAME_ROW_THRESHOLD > value;
const getFirstRowLeft = artboards => Math.min(...artboards.map(artboard => artboard.frame().x()));
const getRowMaxWidth = artboards =>
  Math.max(...artboards.map(artboard => artboard.frame().width()));

const getRows = artboards => {
  const sortedArtboards = artboards.sort((a1, a2) => a1.frame().x() > a2.frame().x());
  let currentRow = { index: 0, x: sortedArtboards[0].frame().x() };
  return sortedArtboards.reduce((acc, artboard) => {
    if (!isBetween(currentRow.x, artboard.frame().x())) {
      currentRow = { index: currentRow.index + 1, x: artboard.frame().x() };
    }
    acc[currentRow.index] = (acc[currentRow.index] || []).concat(artboard);
    return acc;
  }, []);
};

const getRowXs = rows => {
  let currentRowLeft = getFirstRowLeft(rows[0]);

  return rows.map(artboards => {
    const x = currentRowLeft;
    currentRowLeft = currentRowLeft + getRowMaxWidth(artboards) + ROW_MARGIN;
    return x;
  });
};

const adjustArtboardPositions = document => {
  document.pages().forEach(page => {
    const applicableArtboards = Array.from(page.artboards()).filter(isArtboard);
    if (!applicableArtboards.length) return;

    const artboardRows = getRows(applicableArtboards);
    getRowXs(artboardRows).forEach((x, index) => {
      artboardRows[index].forEach(artboard => {
        adjustLayerFrame(artboard, { x });
      });
    });
  });
};

module.exports = adjustArtboardPositions;
