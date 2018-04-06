# sketch-symbol-legend

Legend plugin for sketch app.

[download me](https://github.com/amimagid/sketch-symbol-legend/releases/download/v1.1.0/Legend.sketchplugin.zip)

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

* [x] ~Currently works only on artboards that are on (0,0) coordinates.~
* [x] ~duplicate numbering on designs with groups.~
* [x] ~Currently works only on one page and one artboard.~
* [x] ~Hard coded Legend sizes.~
* [x] ~Hard coded Legend items sizes.~
* [x] ~Filter out non wix-style-react components~
* [x] ~Remove empty legends~
* [x] ~Fixed legend indexes positions and names~
* [x] ~Add delete legends command~
* [x] ~Add associations between arboards and legends~

======= Blockers ========

* [x] Place legend to the bottom of artboard and perform shifts if needed. The width of the legend artboard should be equal to the original artboard.
* [x] Add bg color to legend indexes(make them looks like bages) and remove the "()".
* [x] Identify the wsr components by Library Name; if detached recursively go inside of folder and scan it for wsr components using same detection technique.
* [x] Display all the overrides, even if in their default state.

======= None blockers ========

* [x] Scan the components in the correct order, then apply the indexing respectively.
* [x] In the legend artboard create one string with \n as separator, instead of multiple text labels because it affects the left sidebar in sketch.
* [ ] [Prototyping and links](https://blog.zeplin.io/flows-in-zeplin-round-one-c56550f23f0f) between legend indexes and legend (POC is in the branch feature/prototyping-and-links)
  * Hotspots https://sketchapp.com/docs/prototyping/hotspots
  * Hotspot API https://developer.sketchapp.com/reference/api/#hotspot

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

