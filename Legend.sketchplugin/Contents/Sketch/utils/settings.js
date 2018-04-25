const settings = require('sketch/settings'); // eslint-disable-line node/no-missing-require
const { getDefaultUserLibrary } = require('../utils/symbol');
const { ACTIVE_LIB_NAME_SETTING } = require('../constants');

module.exports = {
  set(key, value) {
    settings.setSettingForKey(String(key), String(value));
  },
  get(key) {
    return settings.settingForKey(key) || getDefaultUserLibrary();
  },
  setActiveLibName(name) {
    this.set(ACTIVE_LIB_NAME_SETTING, name);
  },
  getActiveLibName() {
    return this.get(ACTIVE_LIB_NAME_SETTING);
  }
};
