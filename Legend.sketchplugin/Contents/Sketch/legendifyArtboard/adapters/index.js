const {getLoaderProps} = require('./loader');

const getComponentData = (componentName, symbolData) => {
  const components = {
    "1.5 Loader" : getLoaderProps
  };

  return components[componentName] ? components[componentName](symbolData) : {};
};

module.exports = {
  getComponentData
};

