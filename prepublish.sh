#!/usr/bin/env bash

PACKAGE_VERSION=$(node -p -e \"require('./package.json').version\")
sed -i.bak 's|download/v[0-9.]*/Legend.sketchplugin.zip|download/v'$PACKAGE_VERSION'/Legend.sketchplugin.zip|g' README.MD
rm README.MD.bak
git commit -m "Updated readme download link to v$PACAKGE_VERSION"
