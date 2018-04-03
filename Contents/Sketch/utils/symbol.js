/**
 * Get library name.
 * @param {SymbolMaster} symbolMaster
 * @return String
 */
const getLibraryName = symbolMaster => {
  const library = AppController
    .sharedInstance()
    .librariesController()
    .libraryForShareableObject(symbolMaster);
  return library ? library.name() : '';
};

module.exports = {
  getLibraryName
};
