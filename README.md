# Premiere Pro Console Extension

[![GitHub](https://img.shields.io/badge/GitHub-ibrahimsaber1-blue?logo=github)](https://github.com/ibrahimsaber1/PremierePro-Console)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ibrahimsaber1/PremierePro-Console/pulls)

A powerful JavaScript console extension for Adobe Premiere Pro that allows you to execute ExtendScript commands directly within Premiere Pro with advanced features including intelligent autocomplete, code snippets, comprehensive API documentation, and multilingual support.

![Premiere Pro Console Screenshot](https://github.com/ibrahimsaber1/PremierePro-Console/blob/main/img/console2.png)

## ✨ Features

### 🎯 **Intelligent Autocomplete**
- Smart code completion with context-aware API suggestions
- Real-time property and method suggestions as you type
- Navigate suggestions with arrow keys, accept with Enter/Tab
- Manual trigger with `Ctrl+Space`

### 📝 **Code Snippets Library**
- 40+ pre-written code examples for common tasks
- Searchable snippet browser
- One-click insertion into editor
- Categories: Project Management, Sequences, Markers, Tracks, Export, and more
- Access via `Ctrl+Shift+P` or Snippets button

### 📚 **Interactive API Documentation**
- Complete Premiere Pro ExtendScript API reference
- Searchable documentation for all objects, methods, and properties
- Detailed information including parameters, return types, and descriptions
- Organized by categories for easy navigation
- Access via `F2` or Docs button

### 💾 **Code Persistence**
- Automatic code saving between sessions
- Manual save/load functionality (`Ctrl+S` / `Ctrl+O`)
- Local storage-based code preservation

### 🔍 **Console Search & Filtering**
- Real-time search through console output
- Quickly find specific execution results
- Filter by keywords or values

### 🎨 **Code Formatting**
- Auto-format code with proper indentation
- Smart bracket/quote pairing
- Tab support for clean code structure

### 🌍 **Multilingual Support (15 Languages)**
- English, Arabic, Spanish, Chinese (Simplified), French
- Hindi, German, Portuguese, Italian, Turkish
- Japanese, Korean, Russian, Ukrainian
- Language preference saved automatically
- Comprehensive translations for all interface elements

### ⚡ **Real-time Execution**
- Execute ExtendScript code directly in Premiere Pro
- Instant result display in console
- Error handling and debugging support
- Execution time tracking

### 🎹 **Keyboard Shortcuts**
- `Ctrl+Enter` - Execute code
- `Ctrl+Space` - Trigger autocomplete
- `Ctrl+Shift+P` - Open snippets menu
- `Ctrl+S` - Save code locally
- `Ctrl+O` - Load saved code
- `F1` - Show help panel
- `F2` - Open API documentation
- `Tab` - Insert indentation
- `Esc` - Close active panel

## 📦 Installation

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
   **Note:** For different Adobe versions, the CSXS folder might be version 9, 10, or 11

#### macOS

1. Open Terminal
2. Enter and run the following command:
   ```
   defaults write com.adobe.CSXS.10 PlayerDebugMode 1
   ```
   **Note:** For different Adobe versions, you might need to use 9, 10, or 11 instead of 10

### Extension Installation

#### Windows

1. Download or clone this repository:
   ```
   git clone https://github.com/ibrahimsaber1/PremierePro-Console.git
   ```
2. Copy the entire `PremierePro-Console` folder to:
   ```
   C:\Users$$USERNAME]\AppData\Roaming\Adobe\CEP\extensions\
   ```
   **Note:** Create the 'extensions' folder if it doesn't exist

#### macOS

1. Download or clone this repository:
   ```
   git clone https://github.com/ibrahimsaber1/PremierePro-Console.git
   ```
2. Copy the entire `PremierePro-Console` folder to:
   ```
   ~/Library/Application Support/Adobe/CEP/extensions/
   ```
   **Note:** Create the 'extensions' folder if it doesn't exist

### Folder Structure

Ensure your installation maintains this folder structure:

```
PremierePro-Console/
├── CSXS/
│   └── manifest.xml
├── client/
│   ├── CSInterface.js
│   ├── autocomplete-core.js
│   ├── docs-panel.js
│   ├── extendscript-api.js
│   ├── index.html
│   ├── index.js
│   ├── snippets.js
│   ├── styles.css
│   └── translations.js
├── host/
│   └── index.jsx
├── img/
│   └── console.png
└── README.md
```

## 🚀 Getting Started

### Accessing the Extension

1. Launch Adobe Premiere Pro
2. Go to `Window > Extensions > Premiere Console`
3. The console panel should appear in your Premiere Pro workspace

### Basic Usage

1. **Write Code**: Type your ExtendScript code in the editor
2. **Execute**: Press `Ctrl+Enter` or click the "Run" button
3. **View Results**: Check the console output below
4. **Use Autocomplete**: Type `app.` and watch suggestions appear
5. **Browse Docs**: Press `F2` to explore the complete API reference
6. **Try Snippets**: Press `Ctrl+Shift+P` for ready-to-use code examples

## 📖 Usage Examples

### Basic Examples

#### Get Project Information
```
// Get current project details
$.writeln("Project: " + app.project.name);
$.writeln("Path: " + app.project.path);
$.writeln("Sequences: " + app.project.sequences.numSequences);
```

#### List All Sequence Markers
```
// Get all markers in active sequence
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
var index = 0;

while (marker) {
    $.writeln("Marker " + index + ": " + marker.name);
    $.writeln("  Time: " + marker.start.seconds + " seconds");
    $.writeln("  Type: " + marker.type);
    marker = markers.getNextMarker(marker);
    index++;
}
```

#### Export Sequence
```
// Export active sequence using preset
var seq = app.project.activeSequence;
var outputPath = "C:/Output/export.mp4";
var presetPath = "C:/Presets/H264.epr";
var workAreaType = 0; // 0=entire, 1=in-out, 2=work area

seq.exportAsMediaDirect(outputPath, presetPath, workAreaType);
$.writeln("Export started");
```

### Advanced Examples

#### List All Clips on All Video Tracks
```
var sequence = app.project.activeSequence;
var videoTracks = sequence.videoTracks;

for (var i = 0; i < videoTracks.numTracks; i++) {
    var track = videoTracks[i];
    $.writeln("Track " + (i+1) + ": " + track.name);
    
    for (var j = 0; j < track.clips.numItems; j++) {
        var clip = track.clips[j];
        $.writeln("  Clip: " + clip.name);
        $.writeln("    Start: " + clip.start.seconds + "s");
        $.writeln("    Duration: " + clip.duration.seconds + "s");
    }
}
```

#### Create Markers from Array
```
// Create multiple markers at specified times
var markerTimes = [5.0, 10.0, 15.0, 20.0, 25.0];
var markers = app.project.activeSequence.markers;

for (var i = 0; i < markerTimes.length; i++) {
    var marker = markers.createMarker(markerTimes[i]);
    marker.name = "Chapter " + (i + 1);
    marker.comments = "Auto-generated marker";
}

$.writeln("Created " + markerTimes.length + " markers");
```

#### Batch Rename Project Items
```
// Rename all clips in a bin with prefix
function renameItemsInBin(bin, prefix) {
    for (var i = 0; i < bin.children.numItems; i++) {
        var item = bin.children[i];
        if (item.type === 1) { // CLIP type
            var newName = prefix + "_" + (i + 1) + "_" + item.name;
            item.name = newName;
            $.writeln("Renamed: " + newName);
        }
    }
}

var targetBin = app.project.rootItem.children; // First bin
renameItemsInBin(targetBin, "SHOT");
```

## 🛠️ API Documentation

The extension includes comprehensive API documentation accessible via the Docs panel (`F2`). Browse through:

- **Application (app)** - Main application object with project management
- **Project** - Project operations, import/export, sequences
- **Sequence** - Timeline operations, tracks, markers, editing
- **ProjectItem** - Media items, bins, footage interpretation
- **Track** - Audio/video track operations
- **TrackItem** - Individual clips and their properties
- **Marker** - Sequence and clip markers
- **Component** - Effects and their parameters
- **Encoder** - Adobe Media Encoder integration
- **SourceMonitor** - Source monitor control
- **Collections** - All collection types (tracks, items, markers, etc.)

## 🔧 Troubleshooting

### Extension doesn't appear in the Window menu

- ✅ Verify you have enabled debug mode correctly
- ✅ Check if the extension folder is in the correct location
- ✅ Restart Premiere Pro after installation
- ✅ Check the extension files for any errors in Console (F12)

### Error: "Extension cannot be loaded"

- ✅ Verify your `manifest.xml` file is correctly formatted
- ✅ Make sure your Premiere Pro version is compatible (CC 2018+)
- ✅ Check that all required files are present in the folder structure

### Autocomplete not working

- ✅ Ensure `extendscript-api.js` is loaded (check browser console)
- ✅ Try manually triggering with `Ctrl+Space`
- ✅ Verify you're typing valid object paths (e.g., `app.project.`)

### Snippets show "Snippets not loaded"

- ✅ Verify `snippets.js` is present in the `client` folder
- ✅ Check browser console (F12) for loading errors
- ✅ Refresh the extension or restart Premiere Pro

### Commands return errors

- ✅ Make sure you have an active project open in Premiere Pro
- ✅ For sequence-related commands, ensure you have an active sequence
- ✅ Check your code syntax for errors
- ✅ Use `try-catch` blocks for error handling

## 🌐 Resources

### Official Documentation
- [Adobe Premiere Pro ExtendScript API Documentation](https://ppro-scripting.docsforadobe.dev/)
- [Adobe ExtendScript Documentation](https://extendscript.docsforadobe.dev/)
- [Adobe CEP Documentation](https://github.com/Adobe-CEP/CEP-Resources)

### Community
- [GitHub Issues](https://github.com/ibrahimsaber1/PremierePro-Console/issues) - Report bugs or request features
- [GitHub Discussions](https://github.com/ibrahimsaber1/PremierePro-Console/discussions) - Ask questions and share ideas

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs**: Open an issue describing the problem
2. **Suggest Features**: Share your ideas for new features
3. **Submit Pull Requests**: 
   - Fork the repository
   - Create a feature branch (`git checkout -b feature/AmazingFeature`)
   - Commit your changes (`git commit -m 'Add some AmazingFeature'`)
   - Push to the branch (`git push origin feature/AmazingFeature`)
   - Open a Pull Request

### Areas for Contribution
- 🌍 Additional language translations
- 📝 More code snippets for common workflows
- 📚 Enhanced API documentation
- 🎨 UI/UX improvements
- 🐛 Bug fixes and performance optimizations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ibrahim Saber**
- GitHub: [@ibrahimsaber1](https://github.com/ibrahimsaber1)
- Repository: [PremierePro-Console](https://github.com/ibrahimsaber1/PremierePro-Console)

## 🙏 Acknowledgments

- Adobe CEP and ExtendScript teams for providing the framework
- The Premiere Pro developer community for support and feedback
- All contributors who help improve this extension

## 📊 Version History

### v2.0.0 (Latest)
- ✨ Added intelligent autocomplete system
- 📝 Integrated 40+ code snippets library
- 📚 Added comprehensive API documentation browser
- 🌍 Added multilingual support (15 languages)
- 💾 Implemented code persistence and save/load
- 🔍 Added console output search and filtering
- 🎨 Enhanced UI with better styling and animations
- ⚡ Improved execution performance and error handling

### v1.0.0
- 🎉 Initial release
- Basic code execution functionality
- Simple console output display

---

## ⭐ Star This Repository

If you find this extension useful, please consider giving it a star on GitHub! It helps others discover the project.

[![GitHub stars](https://img.shields.io/github/stars/ibrahimsaber1/PremierePro-Console?style=social)](https://github.com/ibrahimsaber1/PremierePro-Console/stargazers)

---

**Made with ❤️ by Ibrahim Saber**

For issues, feature requests, or contributions, please visit the [GitHub repository](https://github.com/ibrahimsaber1/PremierePro-Console).
