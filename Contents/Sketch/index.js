var sketch = require('sketch');
var Rectangle = require('sketch/dom').Rectangle

var SYMBOL_INSTANCE_CLASSNAME = "MSSymbolInstance";
var SYMBOL_MASTER_CLASSNAME = "MSSymbolMaster";

const runLegendScript = function(context) {
  var doc = context.document;
  initSymbolDict(doc)

  var pages = doc.pages();
  for (var i = 0; i < pages.length; i++) {
    var currPage = pages[i];
    var artboards = currPage.artboards();
    for (var j = 0; j < artboards.length; j++) {
      var currArtboard = artboards[j];
      var legendArtboard = createAndAddLegendArtboard(currArtboard, currPage);
      legendify(currArtboard, context, currArtboard, legendArtboard, 0);
    }

  }
};

var initSymbolDict = function(doc) {
  var firstLevelSymbols = doc.documentData().allSymbols();
  initSymbolDictFlat(firstLevelSymbols);
};

var symbolsDict = {};
var initSymbolDictFlat = function(symbols) {
  for (var i = 0; i < symbols.count(); i++) {
    var symbol = symbols.objectAtIndex(i);
    if(symbol.class() == SYMBOL_INSTANCE_CLASSNAME ||
       symbol.class() == SYMBOL_MASTER_CLASSNAME) {
      if (symbol.layers) {
        initSymbolDictFlat(symbol.layers());
      }
      symbolsDict[symbol.symbolID()] = symbol;
      symbolsDict[symbol.objectID()] = symbol;
    }
  }
};

var createAndAddLegendArtboard = function(currArtboard, currPage) {
  var rect = new Rectangle(currArtboard.frame().x() - 500, currArtboard.frame().y() , 500, 500);
  var artboard = new sketch.Artboard({
    parent: currPage,
    name: 'Legend',
    flowStartPoint: true,
    frame: rect,

  });
  artboard.adjustToFit();
  return artboard;
};

var legendify = function(comp, context, currArtboard, legendArtboard, prevIndex) {
  if (comp.layers) {
    var compLayers = comp.layers();
    var currLegendNextY = 0;
    for (var k = 0; k < compLayers.length; k++) {
      var layer = compLayers[k];
      var currentIndex = prevIndex + k;
      if (layer.class() != SYMBOL_INSTANCE_CLASSNAME) {
        legendify(layer, context, currArtboard, legendArtboard, currentIndex);
      }

      addIndexesToSymbols(context, layer, currentIndex, currArtboard);

      if (layer.overrides) {
        var overrideDescription = buildOverrideDescription(layer, currentIndex);
        addDescriptionToLegend(overrideDescription, legendArtboard, currLegendNextY);
        currLegendNextY+=80;
      }
    }
  }
};

var buildOverrideDescription = function(layer, index) {
  var description ='('+(index)+') '+layer.name()+'\n';
  var overrides = layer.overrides();
  for (key in overrides) {
    var override = overrides[key];
    if (symbolsDict[key]) {
      description+='        ' + symbolsDict[key].name();
      if (override.symbolID) {
        var valueString = symbolsDict[override.symbolID];
        description+=" = ";
        description+=valueString.name()+'\n';
      }
    }
  }
  return description;
};

var addIndexesToSymbols = function(context, layer, index, currArtboard) {
    if (layer.class() == SYMBOL_INSTANCE_CLASSNAME) {
      var rect = new Rectangle(layer.frame().x(), layer.frame().y()-15, layer.frame().width(), layer.frame().height());
      var text = new sketch.Text({
        parent: currArtboard,
        alignment: sketch.Text.Alignment.center,
        text: '(' + index + ')',
        frame: rect,

      })
      text.adjustToFit()
    }
};

var addDescriptionToLegend = function(str, artboard, nextY) {
  var rect = new Rectangle(0, nextY, 200, 200);
  var text = new sketch.Text({
    parent: artboard,
    text: str,
    frame: rect,

  });
  text.adjustToFit();
};


/* Export plugin command handler */
this.runLegendScript = runLegendScript;
