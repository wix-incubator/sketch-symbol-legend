const settings = require('sketch/settings');
const { ACTIVE_LIB_NAME_SETTING, WIX_STYLE_LIBRARY_NAME } = require('../constants');

module.exports = {
  set(key, value) {
    settings.setSettingForKey(String(key), String(value));
  },
  get(key) {
    return settings.settingForKey(key) || WIX_STYLE_LIBRARY_NAME;
  },
  setActiveLibName(name) {
    this.set(ACTIVE_LIB_NAME_SETTING, name);
  },
  getActiveLibName() {
    return this.get(ACTIVE_LIB_NAME_SETTING);
  }
};
