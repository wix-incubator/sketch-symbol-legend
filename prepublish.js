const { exec } = require('@skpm/internal-utils/exec'); // eslint-disable-line
const fs = require('fs');
const fileName = 'README.md';
const version = require('./package.json').version;

const updateReadmeVersion = async () => {
  const fileString = fs.readFileSync(fileName, 'utf8');
  const result = fileString.replace(/download\/v[0-9.]*\/Sketch\.zip/, `download/v${version}/Sketch.zip`);
  fs.writeFileSync(fileName, result, 'utf8');
  await exec(`git add ${fileName}`);
  await exec(`git commit -m "Updated readme download link to version ${version}"`);
  await exec('git push origin HEAD');
}

updateReadmeVersion();
