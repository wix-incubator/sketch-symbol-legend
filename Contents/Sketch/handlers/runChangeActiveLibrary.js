const ui = require('sketch/ui');
const settings = require('../utils/settings');
const { getUserLibraries } = require('../utils/symbol');

module.exports = () => {
  const libs = getUserLibraries()
    .map((l, index) => ({
      name: l.name(),
      id: index + 1,
    }));

  const message = `Please select active library, type: ${libs.map(l => `${l.id} for ${l.name}`)}`;

  const nextActiveLibId = ui.getStringFromUser(message);
  const nextActiveLib = libs.find(({ id }) => id === Number(nextActiveLibId))

  if (nextActiveLib) {
    ui.message(`Now using: ${nextActiveLib.name}`);
    settings.setActiveLibName(nextActiveLib.name);
  }
};
