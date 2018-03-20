const sketch = require('sketch');
const Rectangle = require('sketch/dom').Rectangle;

const isSketchStringsEqual = require('./utils/isSketchStringsEqual');
const cleanUpLegends = require('./utils/cleanUpLegends');
const createLegendItemIndex = require('./utils/createLegendIndex');
const createSymbolsDictionary = require('./utils/createSymbolsDictionary');

const {
  SYMBOL_INSTANCE_CLASS_NAME,
  LEGEND_ARTBOARD_NAME,
  LEGEND_ITEM_INDEX_NAME,
  LEGEND_ARTBOARD_MIN_WIDTH,
  LEGEND_ITEM_HEIGHT,
} = require('./constants');

const legendItemOffsetGenerator = () => {
  let lastItemOffsetTop = 0;
  return () => {
    const curItemOffsetTop = lastItemOffsetTop;
    lastItemOffsetTop += LEGEND_ITEM_HEIGHT;
    return curItemOffsetTop;
  }
};

const getNextItemOffsetTop = legendItemOffsetGenerator();

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
    if (!isSketchStringsEqual(artboard.name(), LEGEND_ARTBOARD_NAME)) {
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
    if (!isSketchStringsEqual(layer.class(), SYMBOL_INSTANCE_CLASS_NAME)) {
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
