const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const createSymbolsDictionary = require('./utils/createSymbolsDictionary');
const cleanUpPageLegends = require('./cleanUpPageLegends');
const legendifyArtboard = require('./legendifyArtboard');

const { ARTBOARD_GROUP_CLASS_NAME } = require('./constants');

function runCleanUpLegends({ document }) {
  document.pages().forEach(page => {
    cleanUpPageLegends(page);
  });
}

function runAddLegends({ document }) {
  const symbolsDictionary = createSymbolsDictionary(
    document.documentData().allSymbols()
  );

  // cleanup previous legends on rerun
  document.pages().forEach(page => {
    cleanUpPageLegends(page);

    page.artboards().forEach(artboard => {
      if (isSketchStringsEqual(artboard.class(), ARTBOARD_GROUP_CLASS_NAME)) {
        legendifyArtboard({ artboard, page, symbolsDictionary });
      }
    });
  });
}

/* Export plugin commands handlers */
this.runCleanUpLegends = runCleanUpLegends;
this.runAddLegends = runAddLegends;
