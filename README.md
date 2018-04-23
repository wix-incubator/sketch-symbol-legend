# sketch-symbol-legend

Legend plugin for sketch app.

[download me](https://github.com/wix-incubator/sketch-symbol-legend/releases/download/v1.7.4/Sketch.zip)

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

`command+shift+y` - add legends to selected artboards

`command+shift+d` - clean up legends for selected artboards

`command+shift+ctrl+y` - add legends to all artboards

`command+shift+ctrl+d` - clean up legends for all artboards

## How to use

1.  Select artboards for export
2.  `cmd+shift+y` - add legends for selected artboards
3.  `cmd+ctrl+e` - export selected artboards to zeplin
4.  `cmd+shift+d` - cleanup legends for selected artboards

## Demo

## ![legend demo](https://github.com/wix-incubator/sketch-symbol-legend/blob/master/LegendPlugin.gif)

## Installation

```sh
# clone the repo
git clone git@github.com:wix-incubator/sketch-symbol-legend.git
cd sketch-symbol-legend
# install packages, it will add the plugin to the Sketch app
npm install --no-lockfile
```

## Logs output

```sh
npm run sketch:log
```

## Important links:

* https://developer.sketchapp.com/guides/cocoascript/
* https://developer.sketchapp.com/reference/api/
* https://github.com/turbobabr/Sketch-Plugins-Cookbook
* https://github.com/abynim/Sketch-Headers/

## Debugging:

* https://developer.sketchapp.com/guides/debugging-plugins/
* https://github.com/skpm/sketch-dev-tools

## Release

The following command will create a release with zipped artifact in this repository.
That's why you need to generate [Github access token](https://github.com/settings/tokens).

You need to specify a version bump, it can be one of the following:
`<new-version> | major | minor | patch | premajor | preminor | prepatch | prerelease`.

```sh
GITHUB_ACCESS_TOKEN=<token> SKETCH_RELEASE=<version-bump> npm run sketch:release
```

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
