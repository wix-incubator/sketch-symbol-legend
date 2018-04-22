# sketch-symbol-legend

Legend plugin for sketch app.

[download me](https://github.com/wix-incubator/sketch-symbol-legend/releases/download/v1.6.2/Legend.sketchplugin.zip)

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

1.  Select artboards for export
2.  `cmd+shift+y` - add legends for selected artboards
3.  `cmd+ctrl+e` - export selected artboards to zeplin
4.  `cmd+shift+d` - cleanup legends for selected artboards

## Demo

## ![legend demo](https://github.com/wix-incubator/sketch-symbol-legend/blob/master/LegendPlugin.gif)

## Installation

### From a release (simplest)

* [Download](https://github.com/wix-incubator/sketch-symbol-legend/releases/latest) `Legend.sketchplugin.zip` from the latest release of the plugin
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
cd "$HOME/Library/Application Support/com.bohemiancoding.sketch3/Plugins"
```

* Clone the repo with name `Legend.sketchplugin`

```sh
git clone git@github.com:wix-incubator/sketch-symbol-legend.git Legend.sketchplugin
```

The plugin will be used automatically by Sketch.

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

## Notes (tips, caveats, issues)

* Some newer ES features don't work in Mac OS <= Sierra (e.g. spread operator on objects)
* Plugin works in Sierra and High Sierra
* `Object.class()` result maps 1-to-1 to ObjectiveC headers from Sketch.
  These are extremely helpful for debugging and finding all the possible methods/properties and their signatures.
  https://github.com/abynim/Sketch-Headers/blob/master/Headers/MSSymbolMaster.h
* You can run your code async, consider the following snippet from `skpm`
  https://github.com/airbnb/react-sketchapp/issues/97
* Most of collections support `forEach`, but not other native `Array` methods,
  consider casting to array with `Array.from` before doing `map/reduce/filter/includes` etc.
