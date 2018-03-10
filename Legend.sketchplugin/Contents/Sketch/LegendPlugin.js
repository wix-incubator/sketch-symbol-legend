var sketch = require('sketch');
var Rectangle = require('sketch/dom').Rectangle

var SYMBOL_INSTANCE_CLASSNAME = "MSSymbolInstance";
var SYMBOL_MASTER_CLASSNAME = "MSSymbolMaster";

var artboardX;
var artboardY;
var runLegendScript = function(context) {
  artboardX = currPage.artboards()[0].frame().x();
  artboardY = currPage.artboards()[0].frame().y();
  var doc = context.document;
  var docSymbols = doc.documentData().allSymbols();
  getAllSymbols(docSymbols);
  var pages = doc.pages();

  for (var i = 0; i < pages.length; i++) {
    var currPage = pages[i];
    var legendArtboard = createAndAddArtboard(context); //NOTICE!! - for now supporting only one page and one artboard.
    legendify(currPage, context, legendArtboard, 0);
  }
};

var symbolsDict = {};
var getAllSymbols = function(symbols) {  
  for (var i = 0; i < symbols.count(); i++) {
    var symbol = symbols.objectAtIndex(i);
    if(symbol.class() == SYMBOL_INSTANCE_CLASSNAME || 
       symbol.class() == SYMBOL_MASTER_CLASSNAME) {
      if (symbol.layers) {
        getAllSymbols(symbol.layers());
      }               
      symbolsDict[symbol.symbolID()] = symbol;
      symbolsDict[symbol.objectID()] = symbol;
    } 
  }
};

var createAndAddArtboard = function(context) {
  var page = getSelectedPage(context);
  var rect = new Rectangle(-500, 0, 500, 500);  
  var artboard = new sketch.Artboard({
    parent: page,
    name: 'Legend',
    flowStartPoint: true,
    frame: rect,

  });
  artboard.adjustToFit(); 
  return artboard;
};

var legendify = function(comp, context, artboard, currIndex) { 
  if (comp.layers) {
    var compLayers = comp.layers();
    for (var j = currIndex; j < compLayers.length+currIndex; j++) {     
      var layer = compLayers[j-currIndex];
      if (layer.class() != SYMBOL_INSTANCE_CLASSNAME) {
        legendify(layer, context, artboard, currIndex+j);
      } 

      addIndexesToSymbols(context, layer, currIndex+j);

      if (layer.overrides) {
        var str ='('+(currIndex+j)+') '+layer.name()+'\n';       
        var overrides = layer.overrides();
        for (key in overrides) { 
          var override = overrides[key];          
          if (symbolsDict[key]) {
            str+='        ' + symbolsDict[key].name();
            if (override.symbolID) {
              var valueString = symbolsDict[override.symbolID]; 
              str+=" = ";
              str+=valueString.name()+'\n';
            }
          }            
        } 
        addDescriptionToLegend(str, artboard);
      }
    }
  } 
}; 

var getSelectedPage = function(context) {
  var document = sketch.fromNative(context.document);
  return document.selectedPage;
};

var addIndexesToSymbols = function(context, layer, index) {
    if (layer.class() == SYMBOL_INSTANCE_CLASSNAME) {
      var page = getSelectedPage(context);
      var rect = new Rectangle(artboardX + layer.frame().x(), artboardY + layer.frame().y() - 15, layer.frame().width(), layer.frame().height());
      var text = new sketch.Text({
        parent: page,
        alignment: sketch.Text.Alignment.center,
        text: '(' + index + ')',
        frame: rect,

      })
      text.adjustToFit()
    }
};

var y = 0;
var addDescriptionToLegend = function(str, artboard) {
  var rect = new Rectangle(0, y, 200, 200);
  y+=80;  
  var text = new sketch.Text({
    parent: artboard,
    text: str,
    frame: rect,

  });
  text.adjustToFit(); 
};
