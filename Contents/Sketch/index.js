const getSelectedArtboards = require('./utils/getSelectedArtboards');
const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const createSymbolsDictionary = require('./utils/createSymbolsDictionary');
const {
  isLegendArtboard,
  cleanUpPageLegends,
  cleanUpArtboardLegends,
} = require('./cleanUp');
const legendifyArtboard = require('./legendifyArtboard/legendifyArtboard');

const { ARTBOARD_GROUP_CLASS_NAME } = require('./constants');

function runCleanUpLegendsForSelected(context) {
  const document = context.document;
  const artboards = getSelectedArtboards(context);

  if (!artboards.length) {
    document.showMessage(
      'Please select the artboards you want to clean up legends. ☝️ Selecting a layer inside the artboard should be enough.'
    );
    return;
  }

  artboards.forEach(artboard => {
    if (isLegendArtboard(artboard)) {
      artboard.removeFromParent();
      return;
    }

    cleanUpArtboardLegends(artboard);
  });
}

function runAddLegendsForSelected(context) {
  const document = context.document;
  const artboards = getSelectedArtboards(context);

  if (!artboards.length) {
    document.showMessage(
      'Please select the artboards you want to add legends. ☝️ Selecting a layer inside the artboard should be enough.'
    );
    return;
  }

  const symbolsDictionary = createSymbolsDictionary(
    document.documentData().allSymbols()
  );

  artboards.forEach(artboard => {
    if (isLegendArtboard(artboard)) {
      return;
    }

    cleanUpArtboardLegends(artboard);

    legendifyArtboard({ document, artboard, symbolsDictionary });
  });
}

function runCleanUpLegends({ document }) {
  document.pages().forEach(page => {
    cleanUpPageLegends(page);
  });
}

function runAddLegends({ document }) {
  const symbolsDictionary = createSymbolsDictionary(
    document.documentData().allSymbols()
  );

  document.pages().forEach(page => {
    // cleanup previous legends on rerun
    cleanUpPageLegends(page);

    page.artboards().forEach(artboard => {
      if (isSketchStringsEqual(artboard.class(), ARTBOARD_GROUP_CLASS_NAME)) {
        legendifyArtboard({ artboard, page, symbolsDictionary });
      }
    });
  });
}

/* Export plugin commands handlers */
this.runCleanUpLegendsForSelected = runCleanUpLegendsForSelected;
this.runAddLegendsForSelected = runAddLegendsForSelected;

this.runCleanUpLegends = runCleanUpLegends;
this.runAddLegends = runAddLegends;
