const adjustLayerFrame = require('./adjustLayerFrame');
const { isArtboard } = require('./classMatchers');

const SAME_ROW_THRESHOLD = 100;
const ROW_MARGIN = 100;

const isBetween = (base, value) => base - SAME_ROW_THRESHOLD < value && base + SAME_ROW_THRESHOLD > value;
const getFirstRowTop = artboards => Math.min(...artboards.map(artboard => artboard.frame().y()));
const getRowMaxHeight = artboards => Math.max(...artboards.map(artboard => artboard.frame().height()));

const getRows = artboards => {
  const sortedArtboards = artboards.sort(artboard => artboard.frame().y());
  let currentRow = { index: 0, y: sortedArtboards[0].frame().y() };
  return sortedArtboards.reduce((acc, artboard) => {
    if (!isBetween(currentRow.y, artboard.frame().y())) {
      currentRow = { index: currentRow.index + 1, y: artboard.frame().y() };
    }
    acc[currentRow.index] = (acc[currentRow.index] || []).concat(artboard);
    return acc;
  }, []);
};

const getRowYs = rows => {
  let currentRowBottom = getFirstRowTop(rows[0]);

  return rows.map(artboards => {
    const y = currentRowBottom;
    currentRowBottom = currentRowBottom + getRowMaxHeight(artboards) + ROW_MARGIN;
    return y;
  });
};

const adjustArtboardPositions = artboards => {
  const applicableArtboards = Array.from(artboards).filter(isArtboard);
  if (!applicableArtboards.length) return;

  const artboardRows = getRows(applicableArtboards);
  getRowYs(artboardRows).forEach((y, index) => {
    artboardRows[index].forEach(artboard => {
      adjustLayerFrame(artboard, { y });
    })
  })
};


module.exports = adjustArtboardPositions;
