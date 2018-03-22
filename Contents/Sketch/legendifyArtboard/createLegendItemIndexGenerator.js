function createLegendItemOffsetGenerator() {
  let lastItemOffsetTop = 0;
  return () => lastItemOffsetTop++;
}

module.exports = createLegendItemOffsetGenerator;
