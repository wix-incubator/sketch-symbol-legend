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
Shortcut: command+shift+y  
## demo

![legend demo](https://github.com/amimagid/sketch-symbol-legend/blob/master/LegendPlugin.gif)
---
## Installation
Download or Clone the latest version of this project, and open `Legend.sketchplugin`. The plugin will be installed automatically by Sketch.

---
## Known Issues and TODOs
- ~Currently works only on artboards that are on (0,0) coordinates.~ Status: [V]
- duplicate numbering on designs with groups. Status: [x]
- ~Currently works only on one page and one artboard.~ Status: [V] 
- Hard coded Legend sizes. [x]

## Important links:
https://github.com/abynim/Sketch-Headers/
https://developer.sketchapp.com/reference/api/
