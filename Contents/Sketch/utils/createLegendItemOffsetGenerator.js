const LEGEND_ITEM_HEIGHT = 80;

function createLegendItemOffsetGenerator() {
  let lastItemOffsetTop = 0;
  return function getLegendItemOffsetTop() {
    const curItemOffsetTop = lastItemOffsetTop;

    lastItemOffsetTop += LEGEND_ITEM_HEIGHT;

    return curItemOffsetTop;
  }
}

module.exports = createLegendItemOffsetGenerator;
