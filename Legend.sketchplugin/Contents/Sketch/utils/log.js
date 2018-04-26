// eslint-disable-next-line no-undef
const logAsText = (...args) => args.forEach(arg => log(arg));

module.exports = {
  log: logAsText,
};
