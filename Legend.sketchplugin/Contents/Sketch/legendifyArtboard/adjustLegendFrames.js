const adjustLayerFrame = require('../utils/adjustLayerFrame');
const { LEGEND_WIDTH } = require('../constants');

const LEGEND_PADDING = 20;

const adjustArtboardFrame = (artboard, legendGroupItems) => {
  const artboardFrame = artboard.frame();
  const legendGroupItemsHeight = legendGroupItems._object.frame().height();
  adjustLayerFrame(artboard, {
    width: artboard.frame().width() + LEGEND_WIDTH,
    height: Math.max(legendGroupItemsHeight + LEGEND_PADDING, artboardFrame.height()),
  });
};

const adjustLegendGroupFrame = (artboard, legendGroup, legendGroupItems) => {
  const artboardFrame = artboard.frame();
  const legendGroupItemsHeight = legendGroupItems._object.frame().height();

  adjustLayerFrame(legendGroup._object, {
    x: artboardFrame.width(),
    y: 0,
    width: LEGEND_WIDTH,
    height: Math.max(legendGroupItemsHeight + LEGEND_PADDING, artboardFrame.height()),
  });
};

const adjustLegendGroupBackgroundFrame = (legendGroup, legendGroupBackground) => {
  const legendGroupFrame = legendGroup._object.frame();
  adjustLayerFrame(legendGroupBackground._object, {
    x: 0,
    y: 0,
    width: legendGroupFrame.width(),
    height: legendGroupFrame.height(),
  });
};

const adjustLegendGroupItemsFrame = (artboard, legendGroupItems) => {
  legendGroupItems._object.setTextBehaviour(1); // 1 = auto

  adjustLayerFrame(legendGroupItems._object, {
    x: LEGEND_PADDING,
    y: LEGEND_PADDING,
    width: LEGEND_WIDTH - LEGEND_PADDING * 2,
  });
};

const adjustLegendFrames = (artboard, legendGroup, legendGroupBackground, legendGroupItems) => {
  adjustLegendGroupItemsFrame(artboard, legendGroupItems);
  adjustLegendGroupFrame(artboard, legendGroup, legendGroupItems);
  adjustLegendGroupBackgroundFrame(legendGroup, legendGroupBackground);
  adjustArtboardFrame(artboard, legendGroupItems);
};

module.exports = adjustLegendFrames;
