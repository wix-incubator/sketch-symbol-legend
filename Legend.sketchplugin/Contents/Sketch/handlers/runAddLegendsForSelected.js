const legendifyArtboards = require('../legendifyArtboard/legendifyArtboards');
const { cleanUpLegends } = require('../cleanup/legends');
const getSelectedArtboards = require('../utils/getSelectedArtboards');
const { createSymbolsDictionaries } = require('../utils/createSymbolsDictionary');
const { sketchWaitForCompletion } = require('../utils/async');

const addLegends = (context) => {
  const document = context.document;
  const artboards = getSelectedArtboards(context);

  if (!artboards.length) {
    document.showMessage(
      'Please select the artboards you want to add legends. ☝️ Selecting a layer inside the artboard should be enough.'
    );
    return;
  }
  const {localSymbolsDictionary , symbolsDictionary} = createSymbolsDictionaries(document);

  cleanUpLegends(artboards);

  return legendifyArtboards({ document, symbolsDictionary, artboards, localSymbolsDictionary })
    .then(() => document.showMessage('Selected artboards processed.'))
    .catch(() => document.showMessage('Processing failed!'));
};

const runAddLegendsForSelected = context => {
  sketchWaitForCompletion(() => addLegends(context));
};

module.exports = runAddLegendsForSelected;
