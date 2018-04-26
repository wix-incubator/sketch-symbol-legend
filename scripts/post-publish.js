const { exec } = require('@skpm/internal-utils/exec'); // eslint-disable-line
const fs = require('fs');

const README = 'README.md';
const MANIFEST = 'Legend.sketchplugin/Contents/Sketch/manifest.json';
const version = require('../package.json').version;

const updateReadmeVersion = () => {
  const fileString = fs.readFileSync(README, 'utf8');
  const result = fileString.replace(/download\/v[0-9.]*\/Sketch\.zip/, `download/v${version}/Sketch.zip`);
  fs.writeFileSync(README, result, 'utf8');
};

const updateManifestVersion = () => {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  manifest.version = version;
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2), 'utf8');
};

const gitCommit = async files => {
  await exec(`git add ${files.join(' ')}`);
  await exec(`git commit -m "Updated manifest & readme download link to version ${version}"`);
  await exec('git push origin HEAD');
};

updateReadmeVersion();
updateManifestVersion();
gitCommit([README, MANIFEST]);
