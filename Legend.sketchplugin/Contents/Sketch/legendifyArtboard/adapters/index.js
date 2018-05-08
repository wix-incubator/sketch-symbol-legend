const {getLoaderProps} = require('./loader');
const {getBadgeProps} = require('./badge');
const {getTextLinkProps} = require('./textLink');

const getComponentData = (componentName, symbolData) => {
  const components = {
    "1.5 Loader" : getLoaderProps,
    "12.1 Badge": getBadgeProps,
    "5.3 Text Button": getTextLinkProps
  };

  return components[componentName] ? components[componentName](symbolData) : {};
};

module.exports = {
  getComponentData
};

