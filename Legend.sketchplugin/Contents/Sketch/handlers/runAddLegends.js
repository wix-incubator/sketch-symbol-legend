const { createSymbolsDictionaries } = require('../utils/createSymbolsDictionary');
const Promifill = require('../utils/promifill');
const { sketchWaitForCompletion } = require('../utils/async');
const legendifyArtboards = require('../legendifyArtboard/legendifyArtboards');
const { cleanUpLegends } = require('../cleanup/legends');

const addLegends = ({ document }) => {
  const {localSymbolsDictionary , symbolsDictionary} = createSymbolsDictionaries(document);
  document.pages().forEach(page => cleanUpLegends(page.artboards()));

  return Promifill.all(
    Array.from(document.pages()).map(page =>
      legendifyArtboards({ document, symbolsDictionary, artboards: page.artboards(), localSymbolsDictionary })
    )
  )
    .then(() => document.showMessage('All Artboards processed.'))
    .catch(() => document.showMessage('Processing failed!'));
};

const runAddLegends = context => {
  sketchWaitForCompletion(() => addLegends(context));
};

module.exports = runAddLegends;
