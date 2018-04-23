// NOTE: sketch strings may be 'string' or 'object'
// NOTE: sketch's `require('./path')` transforms native string to sketch string object
function isSketchStringsEqual(a, b) {
  return String(a) === String(b);
}

module.exports = isSketchStringsEqual;
