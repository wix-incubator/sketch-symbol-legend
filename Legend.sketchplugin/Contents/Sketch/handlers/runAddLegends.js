const createSymbolsDictionary = require('../utils/createSymbolsDictionary');
const Promifill = require('../utils/promifill');
const { sketchWaitForCompletion } = require('../utils/async');
const legendifyArtboards = require('../legendifyArtboard/legendifyArtboards');
const { cleanUpLegends } = require('../cleanUp');

const addLegends = ({ document }) => {
  const symbolsDictionary = createSymbolsDictionary(document.documentData().allSymbols());
  document.pages().forEach(page => cleanUpLegends(page.artboards()));

  return Promifill.all(
    Array.from(document.pages()).map(page =>
      legendifyArtboards({ document, symbolsDictionary, artboards: page.artboards() })
    )
  )
    .then(() => document.showMessage('All Artboards processed.'))
    .catch(() => document.showMessage('Processing failed!'));
};

const runAddLegends = context => {
  sketchWaitForCompletion(() => addLegends(context));
};

module.exports = runAddLegends;
