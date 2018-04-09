const ui = require('sketch/ui');
const settings = require('../utils/settings');
const { getUserLibraries } = require('../utils/symbol');

module.exports = () => {
  const libs = getUserLibraries()
    .map((l, index) => ({
      name: l.name(),
      id: index + 1,
    }));

  const libraries = libs.map(l => l.name);

  const selection = ui.getSelectionFromUser("Please select active library", libraries);

  const nextActiveLibId = selection[1] + 1;
  const nextActiveLib = libs.find(({ id }) => id === Number(nextActiveLibId));

  if (nextActiveLib) {
    ui.message(`Now using: ${nextActiveLib.name}`);
    settings.setActiveLibName(nextActiveLib.name);
  }
};
