const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const createLegendItemIndex = require('./utils/createLegendIndex');
const cleanUpLegends = require('./utils/cleanUpLegends');

const SYMBOL_INSTANCE_CLASS_NAME = "MSSymbolInstance";
const SYMBOL_MASTER_CLASS_NAME = "MSSymbolMaster";

const LEGEND_ARTBOARD_NAME = 'Legend';
const LEGEND_ITEM_INDEX_NAME = 'LegendItemIndex';
const LEGEND_ARTBOARD_MIN_WIDTH = 300;
const LEGEND_ITEM_HEIGHT = 80;

const legendItemOffsetGenerator = () => {
  let lastItemOffsetTop = 0;
  return () => {
    const curItemOffsetTop = lastItemOffsetTop;
    lastItemOffsetTop += LEGEND_ITEM_HEIGHT;
    return curItemOffsetTop;
  }
};

const getNextItemOffsetTop = legendItemOffsetGenerator();

const createSymbolsDictionary = function(symbols, dictionary = {}) {
  for (let i = 0; i < symbols.count(); i++) {
    const symbol = symbols.objectAtIndex(i);
    if(symbol.class() === SYMBOL_INSTANCE_CLASS_NAME || symbol.class() === SYMBOL_MASTER_CLASS_NAME) {
      if (symbol.layers) {
        initSymbolDictFlat(symbol.layers(), dictionary);
      }
      dictionary[symbol.symbolID()] = symbol;
      dictionary[symbol.objectID()] = symbol;
    }
  }

  return dictionary;
};

const legendifyArtboard = ({artboard, page, symbolsDictionary}) => {
  const legendArtboard = createLegendArtboard({artboard, page});

  legendify({
    currentLayer: artboard,
    parentArtboard: artboard,
    legendArtboard,
    symbolsDictionary,
  });

  legendArtboard.adjustToFit();

  // TODO: figure out how to update `legendArtboard.frame.x` here
};

const runLegendScript = ({ document }) => {
  const symbolsDictionary = createSymbolsDictionary(document.documentData().allSymbols());

  // cleanup previous legends on rerun
  cleanUpLegends({
    document,
    artboardName: LEGEND_ARTBOARD_NAME,
    legendItemIndexName: LEGEND_ITEM_INDEX_NAME
  });

  document.pages().forEach(page => page.artboards().forEach(artboard => {
    legendifyArtboard({artboard, page, symbolsDictionary});
  }));

  document.pages().forEach(page => page.artboards().forEach(artboard => {
    // NOTE: artboard.name() is object :/
    if (String(artboard.name()) !== LEGEND_ARTBOARD_NAME) {
      return;
    }

    const frame = artboard.frame();

    if (frame.width() < LEGEND_ARTBOARD_MIN_WIDTH) {
      frame.width = LEGEND_ARTBOARD_MIN_WIDTH;
    }

    frame.x = frame.x() - frame.width();
  }));
};

const createLegendArtboard = ({ artboard, page }) => {
  const rect = new Rectangle(artboard.frame().x(), artboard.frame().y());

  return new sketch.Artboard({
    parent: page,
    name: LEGEND_ARTBOARD_NAME,
    flowStartPoint: true,
    frame: rect,
  });
};

const legendify = ({ currentLayer, parentArtboard, legendArtboard, depth = 0, symbolsDictionary}) => {
  if (!currentLayer.layers) {
    return;
  }
  let currLegendNextY = 0;
  currentLayer.layers().forEach((layer, index) => {
    const currentDepth = index + depth;
    if (layer.class() !== SYMBOL_INSTANCE_CLASS_NAME) {
      legendify({currentLayer: layer, parentArtboard, legendArtboard, depth: currentDepth, symbolsDictionary});
    }

    if (layer.overrides) {
      createLegendItemIndex({
        layer,
        name: LEGEND_ITEM_INDEX_NAME,
        depth: currentDepth,
        artboard: parentArtboard
      });
      createLegendItem({layer, depth: currentDepth, legendArtboard, symbolsDictionary});
    }
  });
};

const createLegendItem = ({layer, depth, legendArtboard, symbolsDictionary}) => {
  const overrideDescription = buildOverrideDescription({layer, depth, symbolsDictionary});
  addDescriptionToLegend(overrideDescription, legendArtboard, getNextItemOffsetTop());
}

const buildOverrideDescription = function({layer, depth, symbolsDictionary}) {
  var description ='('+(depth)+') '+layer.name()+'\n';
  var overrides = layer.overrides();
  for (key in overrides) {
    var override = overrides[key];
    if (symbolsDictionary[key]) {
      description+='        ' + symbolsDictionary[key].name();
      if (override.symbolID) {
        var valueString = symbolsDictionary[override.symbolID];
        description+=" = ";
        description+=valueString.name()+'\n';
      }
    }
  }
  return description;
};

const addDescriptionToLegend = function(str, artboard, nextY) {
  const rect = new Rectangle(0, nextY, 200, 200);
  const text = new sketch.Text({
    parent: artboard,
    text: str,
    frame: rect,
  });
  text.adjustToFit();
};


/* Export plugin command handler */
this.runLegendScript = runLegendScript;
