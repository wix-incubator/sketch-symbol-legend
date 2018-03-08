# sketch-symbol-legend
Legend plugin for sketch app.

This plugin provides indexing of Symbols in your artboard and creates a new artboard next to it with detailed legend.

It creates a text symbol with the Symbol's index above the Symbol and on the `Legend` artboard it adds the definition of the symbol as well as it's `overrides` if there are any. 
Note that it will add an `override` only if it was overriden on the `SymbolInstance`.

Feature requests and pull requests are more than welcome :)  
Shortcut: command+shift+y  
## demo

![legend demo](https://raw.githubusercontent.com/amimagid/sketch-symbol-legend/master/LegendPlugin.gif)

## Installation
Download or Clone the latest version of this project, and open `Legend.sketchplugin`. The plugin will be installed automatically by Sketch.

---
## Known Issues and TODOs
- Currently works only on artboards that are on (0,0) coordinates. Status: [x]
