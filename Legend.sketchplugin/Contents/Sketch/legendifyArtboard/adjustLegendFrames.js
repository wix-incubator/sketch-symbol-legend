const adjustLayerFrame = require('../utils/adjustLayerFrame');

const LEGEND_PADDING = 20;
const ARTBOARD_MARGIN = 30;

const adjustArtboardFrame = (artboard, legendGroupItems) => {
  adjustLayerFrame(artboard, {
    height: artboard.frame().height() + legendGroupItems._object.frame().height() + ARTBOARD_MARGIN + LEGEND_PADDING *2,
  })
}

const adjustLegendGroupFrame = (artboard, legendGroup, legendGroupItems) => {
  const artboardFrame = artboard.frame();
  const artboardHeight = artboardFrame.height();
  const artboardWidth = artboardFrame.width();

  const legendGroupItemsHeight = legendGroupItems._object.frame().height();

  adjustLayerFrame(legendGroup._object, {
    x: 0,
    y: artboardHeight + ARTBOARD_MARGIN,
    width: artboardWidth,
    height: legendGroupItemsHeight + LEGEND_PADDING * 2,
  })
}

const adjustLegendGroupItemsFrame = (artboard, legendGroupItems) => {
  const artboardWidth = artboard.frame().width();
  legendGroupItems._object.setTextBehaviour(1); // 1 = auto
  legendGroupItems._object.setIsLocked(true);

  adjustLayerFrame(legendGroupItems._object, {
    x: LEGEND_PADDING,
    y: LEGEND_PADDING,
    width: artboardWidth - LEGEND_PADDING * 2,
  })
}

const adjustLegendFrames = (artboard, legendGroup, legendGroupItems) => {
  adjustLegendGroupFrame(artboard, legendGroup, legendGroupItems);
  adjustLegendGroupItemsFrame(artboard, legendGroupItems);
  adjustArtboardFrame(artboard, legendGroupItems);
}

module.exports = adjustLegendFrames;
