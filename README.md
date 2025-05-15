# Premiere Pro Console Extension

A JavaScript console extension for Adobe Premiere Pro that allows you to execute ExtendScript commands directly within Premiere Pro and view their results in real-time.

![Premiere Pro Console Screenshot](screenshot.png)

## Features

- Execute ExtendScript code directly in Premiere Pro
- View execution results immediately
- Multi-line code support
- Quick access buttons for common commands
- Clear and intuitive interface
- Keyboard shortcuts for efficient workflow

## Installation

### Prerequisites

- Adobe Premiere Pro CC 2018 or later
- Basic knowledge of JavaScript and ExtendScript

### Enable Debug Mode

Before installing the extension, you need to enable debug mode in Adobe CEP:

#### Windows

1. Open Notepad and create a new file with the content: `1`
2. Save this file as `PlayerDebugMode.txt` in this location:
   ```
   %appdata%\Adobe\CSXS\10\
   ```
   Note: For different Adobe versions, the CSXS folder might be version 9, 10, or 11

#### macOS

1. Open Terminal
2. Enter and run the following command:
   ```
   defaults write com.adobe.CSXS.10 PlayerDebugMode 1
   ```
   Note: For different Adobe versions, you might need to use 9, 10, or 11 instead of 10

### Extension Installation

#### Windows

1. Download or clone this repository
2. Copy the entire `PremierePro-Console` folder to:
   ```
   C:\Users\[USERNAME]\AppData\Roaming\Adobe\CEP\extensions\
   ```
   Note: Create the 'extensions' folder if it doesn't exist

#### macOS

1. Download or clone this repository
2. Copy the entire `PremierePro-Console` folder to:
   ```
   ~/Library/Application Support/Adobe/CEP/extensions/
   ```
   Note: Create the 'extensions' folder if it doesn't exist

### Folder Structure

Ensure your installation maintains this folder structure:

```
PremierePro-Console/
├── CSXS/
│   └── manifest.xml
├── client/
│   ├── CSInterface.js
│   ├── index.html
│   ├── index.js
│   └── styles.css
└── host/
    └── index.jsx
```

## Accessing the Extension

1. Launch Adobe Premiere Pro
2. Go to `Window > Extensions > Premiere Console`
3. The console panel should appear in your Premiere Pro workspace

## Usage Guide

### Basic Usage

1. Type ExtendScript code in the input area
2. Click "Execute" or press Ctrl+Enter (Cmd+Enter on Mac) to run the code
3. View the results in the console output area below

### Quick Commands

Use the provided buttons for common operations:

- **Active Sequence**: Get the current sequence
- **Video Tracks**: List all video tracks in the active sequence
- **Project Items Count**: Count all items in the project
- **Markers Count**: Count all markers in the active sequence

### Example Commands

Here are some useful examples you can try:

#### 1. List all clips in the active sequence

```javascript
var sequence = app.project.activeSequence;
var videoTracks = sequence.videoTracks;
var result = [];
for (var i = 0; i < videoTracks.numTracks; i++) {
  var track = videoTracks[i];
  var clips = track.clips;
  for (var j = 0; j < clips.numItems; j++) {
    result.push(clips[j].name);
  }
}
result
```

#### 2. List all sequence markers with their times

```javascript
var sequence = app.project.activeSequence;
var markers = sequence.markers;
var result = [];
for (var i = 0; i < markers.numMarkers; i++) {
  var marker = markers.getFirstMarker();
  for (var j = 0; j <= i; j++) {
    marker = markers.getNextMarker(marker);
  }
  result.push({
    name: marker.name,
    time: marker.start.seconds + " seconds"
  });
}
result
```

#### 3. Get project information

```javascript
function listProjectItems(item, depth) {
  if (!depth) depth = 0;
  var result = [];
  if (item.children) {
    for (var i = 0; i < item.children.numItems; i++) {
      var child = item.children[i];
      result.push({
        name: child.name,
        type: child.type,
        depth: depth
      });
      if (child.type === ProjectItemType.BIN) {
        result = result.concat(listProjectItems(child, depth + 1));
      }
    }
  }
  return result;
}
var ProjectItemType = {
  BIN: 2,
  CLIP: 1,
  FILE: 4,
  ROOT: 3
};
listProjectItems(app.project.rootItem)
```

## Troubleshooting

### Extension doesn't appear in the Window menu

- Verify you have enabled debug mode correctly
- Check if the extension folder is in the correct location
- Restart Premiere Pro after installation
- Check the extension files for any errors

### Error: "Extension cannot be loaded"

- Verify your manifest.xml file is correctly formatted
- Make sure your Premiere Pro version is compatible with the extension

### Commands return errors

- Make sure you have an active project open in Premiere Pro
- For sequence-related commands, ensure you have an active sequence
- Check your code syntax for errors

## ExtendScript Resources

- [Adobe Premiere Pro ExtendScript API Documentation](https://ppro-scripting.docsforadobe.dev/)
- [Adobe ExtendScript Documentation](https://extendscript.docsforadobe.dev/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Adobe CEP and ExtendScript teams
- The Premiere Pro developer community

---

For issues, feature requests, or contributions, please open an issue on the GitHub repository.
