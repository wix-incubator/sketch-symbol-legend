// https://github.com/zeplin/zeplin-sketch-plugin/blob/v1.6.4/Zeplin.sketchplugin/Contents/Sketch/export.cocoascript#L59-L63
function getSelectedArtboards(context) {
  return context.valueForKeyPath(
    'selection.@distinctUnionOfObjects.parentArtboard'
  );
}

module.exports = getSelectedArtboards;
