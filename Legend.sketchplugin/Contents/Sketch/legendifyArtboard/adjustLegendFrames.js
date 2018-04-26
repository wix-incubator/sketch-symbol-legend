const adjustLayerFrame = require('../utils/adjustLayerFrame');

const LEGEND_PADDING = 20;

const adjustArtboardFrame = (artboard, legendGroupBackground) => {
  adjustLayerFrame(artboard, {
    height: artboard.frame().height() + legendGroupBackground._object.frame().height(),
  });
}

const adjustLegendGroupFrame = (artboard, legendGroup, legendGroupItems) => {
  const artboardFrame = artboard.frame();
  const artboardHeight = artboardFrame.height();
  const artboardWidth = artboardFrame.width();

  const legendGroupItemsHeight = legendGroupItems._object.frame().height();

  adjustLayerFrame(legendGroup._object, {
    x: 0,
    y: artboardHeight,
    width: artboardWidth,
    height: legendGroupItemsHeight + LEGEND_PADDING * 2,
  });
}

const adjustLegendGroupBackgroundFrame = (legendGroup, legendGroupBackground) => {
  const legendGroupFrame = legendGroup._object.frame();
  const newFrame = {
    x: 0,
    y: 0,
    width: legendGroupFrame.width(),
    height: legendGroupFrame.height()
  };
  adjustLayerFrame(legendGroupBackground._object, newFrame)
}

const adjustLegendGroupItemsFrame = (artboard, legendGroupItems) => {
  const artboardWidth = artboard.frame().width();
  legendGroupItems._object.setTextBehaviour(1); // 1 = auto

  adjustLayerFrame(legendGroupItems._object, {
    x: LEGEND_PADDING,
    y: LEGEND_PADDING,
    width: artboardWidth - LEGEND_PADDING * 2,
  });
}

const adjustLegendFrames = (artboard, legendGroup, legendGroupBackground, legendGroupItems) => {
  adjustLegendGroupFrame(artboard, legendGroup, legendGroupItems);
  adjustLegendGroupBackgroundFrame(legendGroup, legendGroupBackground);
  adjustLegendGroupItemsFrame(artboard, legendGroupItems);
  adjustArtboardFrame(artboard, legendGroupBackground);
}

module.exports = adjustLegendFrames;
