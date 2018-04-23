const fs = require('fs');
const fileName = './README.MD';
const version = require('./package.json').version;

fs.readFile(fileName, 'utf8', (err,data) => {
  if (err) {
    return console.log(err);
  }

  const result = data.replace(/download\/v[0-9.]*\/Legend\.sketchplugin\.zip/, `download/v${version}/Legend.sketchplugin.zip`);
  fs.writeFile(fileName, result, 'utf8', err => {
     if (err) return console.log(err);
  });
});
