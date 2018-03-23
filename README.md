# sketch-symbol-legend

Legend plugin for sketch app.

## Motivation

In some companies UX designers make an effort to align with the company's UX standard by creating Sketch symbols that are highly detailed.
Some companies even have components library that the developer use and the UX designer wish to give them the most detailed design.
After exporting to `Zeplin`, most of the data is lost.

---

This plugin provides indexing of Symbols in your artboard and creates a new artboard next to it with detailed legend.

It creates a text symbol with the Symbol's index above the Symbol and on the `Legend` artboard it adds the definition of the symbol as well as it's `overrides` if there are any.
Note that it will add an `override` only if it was overriden on the `SymbolInstance`.

Feature requests and pull requests are more than welcome :)

## Shortcuts

`command+shift+y` - add legends

`command+shift+d` - clean up legends

## How to use

1. Select artboards for export
2. `cmd+shift+y` - add legends for selected artboards
3. `cmd+ctrl+e` - export selected artboards to zeplin
4. `cmd+shift+d` - cleanup legends for selected artboards

## Demo

## ![legend demo](https://github.com/amimagid/sketch-symbol-legend/blob/master/LegendPlugin.gif)

## Installation

### From a release (simplest)

* [Download](https://github.com/amimagid/sketch-symbol-legend/releases/latest) `Legend.sketchplugin.zip` from the latest release of the plugin
* Un-zip
* Double-click on the sketch plugin

### From the sources

* Clone or download the repo
* Un-zip (if downloaded) 
* Rename directory to `Legend.sketchplugin` 
* Double-click on the `Legend.sketchplugin`

OR

> This way is better for plugin development

* Go to sketch plugins directory
```sh
cd /Users/$(whoami)/Library/Application Support/com.bohemiancoding.sketch3/Plugins
```
* Clone the repo with name `Legend.sketchplugin`
```sh
git clone git@github.com:amimagid/sketch-symbol-legend.git Legend.sketchplugin
```
The plugin will be used automatically by Sketch. 

---

## Known Issues and TODOs

* ~Currently works only on artboards that are on (0,0) coordinates.~ Status: [V]
* ~duplicate numbering on designs with groups.~ Status: [V]
* ~Currently works only on one page and one artboard.~ Status: [V]
* ~Hard coded Legend sizes.~ Status: [V]
* ~Hard coded Legend items sizes.~ Status: [V]
* ~Filter out non wix-style-react components~ Status: [V]
* ~Remove empty legends~ Status: [V]
* ~Fixed legend indexes positions and names~ Status: [V]
* ~Add delete legends command~ Status: [V]
* ~Add associations between arboards and legends~ Status: [V]

## Important links:

* https://developer.sketchapp.com/guides/cocoascript/
* https://developer.sketchapp.com/reference/api/
* https://github.com/turbobabr/Sketch-Plugins-Cookbook
* https://github.com/abynim/Sketch-Headers/

## Debugging:

* https://developer.sketchapp.com/guides/debugging-plugins/
* https://github.com/skpm/sketch-dev-tools

## Create plugin archive from source

To create `Legend.sketchplugin.zip`, run `./release.sh` script from root directory
