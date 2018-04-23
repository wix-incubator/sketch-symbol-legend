module.exports = (items, fn, onDone) => {
  coscript.shouldKeepAround = true;

  let doneCount = 0;

  items.forEach((...args) => {
    coscript.scheduleWithInterval_jsFunction(0, () => {
      fn(...args);

      if (++doneCount === items.length) {
        onDone();
        coscript.shouldKeepAround = false;
      }
    });
  });
};
