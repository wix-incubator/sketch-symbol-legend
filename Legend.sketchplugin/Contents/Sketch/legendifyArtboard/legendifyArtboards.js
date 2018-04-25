const legendifyArtboard = require('../legendifyArtboard/legendifyArtboard');
const { isArtboard } = require('../utils/classMatchers');
const adjustArtboardPositions = require('../utils/adjustArtboardPositions');
const Promifill = require('../utils/promifill');
const { log } = require('../utils/log');

const legendifyArtboards = ({ document, symbolsDictionary, artboards }) =>
  Promifill.all(
    Array.from(artboards)
      .filter(isArtboard)
      .map(artboard =>
        legendifyArtboard({
          artboard,
          symbolsDictionary,
          document,
        })
      )
  )
    .then(() => adjustArtboardPositions(artboards))
    .catch(error => log(error))

module.exports = legendifyArtboards;
