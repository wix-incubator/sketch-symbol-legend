function setTextColor({textNode, red, green, blue, alpha}) {
  const textStyle = textNode.sketchObject.style().textStyle();
  const mutableAttributes = NSMutableDictionary.dictionaryWithDictionary(textStyle.attributes());
  const textColor = NSColor.colorWithRed_green_blue_alpha(red, green, blue, alpha);
  mutableAttributes.setObject_forKey(textColor, 'NSColor');
  textStyle.setValue_forKey_(mutableAttributes, 'attributes');
}

module.exports = setTextColor;
