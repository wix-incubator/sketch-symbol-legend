#!/usr/bin/env bash

# To release new plugin as `Legend.sketchplugin.zip`:
#
# 1. update version in `./Contents/Sketch/manifest.json`
# 2. add+push new git tag with updated version
# 3. run `./release.sh` and attach created file to latest release on https://github.com/amimagid/sketch-symbol-legend/releases page
# 4. update download link in `README.md`

PLUGIN_NAME=Legend.sketchplugin
PLUGIN_ZIP_NAME="$PLUGIN_NAME.zip"

mkdir ${PLUGIN_NAME}
if [ $? -ne 0 ] ; then
    # NOTE: its not safe to remove `PLUGIN_NAME` if it already exists. Let user decide to delete it.
    echo "Unable to create '$PLUGIN_ZIP_NAME'."
    echo "Directory $PWD/$PLUGIN_NAME' already exist."
    echo "Please remove it and run script again."
else
    cp -rf ./Contents "./$PLUGIN_NAME"
    zip -FSr ${PLUGIN_ZIP_NAME} ${PLUGIN_NAME}
    rm -rf ${PLUGIN_NAME}
    echo "release: $PLUGIN_ZIP_NAME"
fi