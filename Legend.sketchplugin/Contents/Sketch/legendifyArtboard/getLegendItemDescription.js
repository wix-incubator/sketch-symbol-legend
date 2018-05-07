const {getComponentData} = require('./adapters');

const getLegendItemDescription = ({ layer, layerIndex, symbolsDictionary }) => {
  const symbolMaster = layer.symbolMaster && layer.symbolMaster();
  const componentName = symbolMaster.name().split('/')[1].trim()
  const data = getComponentData(componentName, {symbolMaster, symbolsDictionary}).props;
  const propsArr = Object.keys(data).map(x=> {
    return `- ${x}: ${data[x]}`
  });
  propsArr.push('\n');
  return [`(${layerIndex}) ${componentName}`].concat(propsArr).join('\n');
};

module.exports = getLegendItemDescription;
