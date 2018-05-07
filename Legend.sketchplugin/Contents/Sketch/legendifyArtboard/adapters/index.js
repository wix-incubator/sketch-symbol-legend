const {getLoaderProps} = require('./loader');
const {getBadgeProps} = require('./badge');

const getComponentData = (componentName, symbolData) => {
  const components = {
    "1.5 Loader" : getLoaderProps,
    "12.1 Badge": getBadgeProps,
  };

  return components[componentName] ? components[componentName](symbolData) : {};
};

module.exports = {
  getComponentData
};

