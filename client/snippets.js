// client/snippets.js - Code Snippets Library

const ENHANCED_CODE_SNIPPETS = {
    // ============ BASIC OPERATIONS ============
    "Get Active Project": `// Get the active project
var project = app.project;
$.writeln("Project: " + project.name);`,

    "Get Active Sequence": `// Get the active sequence
var sequence = app.project.activeSequence;
$.writeln("Sequence: " + sequence.name);`,

    "Get Project Name": `// Get project name
var projectName = app.project.name;
$.writeln("Project Name: " + projectName);`,

    "Get Project Path": `// Get project file path
var projectPath = app.project.path;
$.writeln("Project Path: " + projectPath);`,

    "List All Sequences": `// List all sequences in project
var sequences = app.project.sequences;
$.writeln("Total Sequences: " + sequences.numSequences);

for (var i = 0; i < sequences.numSequences; i++) {
    var seq = sequences[i];
    $.writeln("  [" + i + "] " + seq.name);
}`,

    // ============ SEQUENCE OPERATIONS ============
    "Get Sequence Settings": `// Get sequence dimensions and settings
var seq = app.project.activeSequence;
$.writeln("Sequence: " + seq.name);
$.writeln("Dimensions: " + seq.frameSizeHorizontal + "x" + seq.frameSizeVertical);
$.writeln("Timebase: " + seq.timebase);
$.writeln("End Time: " + seq.end + " ticks");`,

    "Get Sequence In/Out Points": `// Get sequence in/out points
var seq = app.project.activeSequence;
var inPoint = seq.getInPoint();
var outPoint = seq.getOutPoint();
$.writeln("In Point: " + inPoint + " seconds");
$.writeln("Out Point: " + outPoint + " seconds");`,

    "Set Sequence In/Out Points": `// Set sequence in/out points
var seq = app.project.activeSequence;
seq.setInPoint(5.0);   // 5 seconds
seq.setOutPoint(30.0); // 30 seconds
$.writeln("In/Out points set");`,

    "Get CTI Position": `// Get Current Time Indicator position
var seq = app.project.activeSequence;
var position = seq.getPlayerPosition();
$.writeln("CTI Position: " + position.seconds + " seconds");
$.writeln("CTI Ticks: " + position.ticks);`,

    "Set CTI Position": `// Set Current Time Indicator position
var seq = app.project.activeSequence;
var newTime = "254016000000"; // Time in ticks
seq.setPlayerPosition(newTime);
$.writeln("CTI moved to new position");`,

    "Export Sequence as Media": `// Export sequence using preset
var seq = app.project.activeSequence;
var outputPath = "C:/Output/export.mp4";
var presetPath = "C:/Presets/H264.epr";
var workAreaType = 0; // 0=entire, 1=in-out, 2=work area

seq.exportAsMediaDirect(outputPath, presetPath, workAreaType);
$.writeln("Export started");`,

    // ============ PROJECT ITEMS ============
    "List All Project Items": `// List all items in project
function listItems(item, depth) {
    var indent = "";
    for (var i = 0; i < depth; i++) indent += "  ";
    
    $.writeln(indent + item.name + " [" + item.type + "]");
    
    if (item.type === 2 && item.children) { // BIN
        for (var i = 0; i < item.children.numItems; i++) {
            listItems(item.children[i], depth + 1);
        }
    }
}

listItems(app.project.rootItem, 0);`,

    "Get Project Item Media Path": `// Get media file path for project item
var item = app.project.rootItem.children[0]; // First item
var mediaPath = item.getMediaPath();
$.writeln("Media Path: " + mediaPath);`,

    "Create New Bin": `// Create a new bin in project
var rootItem = app.project.rootItem;
var newBin = rootItem.createBin("My New Bin");
$.writeln("Created bin: " + newBin.name);`,

    "Import Files to Project": `// Import media files into project
var filePaths = [
    "C:/Media/video1.mp4",
    "C:/Media/video2.mp4"
];
var suppressUI = true;
var targetBin = app.project.rootItem;
var importAsSequence = false;

app.project.importFiles(filePaths, suppressUI, targetBin, importAsSequence);
$.writeln("Imported " + filePaths.length + " files");`,

    "Set Project Item Color Label": `// Set color label on project item
var item = app.project.rootItem.children[0];
// Color indices: 0=Violet, 1=Iris, 2=Caribbean, etc.
item.setColorLabel(5); // Set to Forest (green)
$.writeln("Color label set");`,

    // ============ MARKERS ============
    "Get All Sequence Markers": `// List all markers in sequence
var markers = app.project.activeSequence.markers;
$.writeln("Total Markers: " + markers.numMarkers);

var marker = markers.getFirstMarker();
var index = 0;
while (marker) {
    $.writeln("Marker " + index + ":");
    $.writeln("  Name: " + marker.name);
    $.writeln("  Time: " + marker.start.seconds + "s");
    $.writeln("  Type: " + marker.type);
    marker = markers.getNextMarker(marker);
    index++;
}`,

    "Create Sequence Marker": `// Create a new marker at 10 seconds
var markers = app.project.activeSequence.markers;
var newMarker = markers.createMarker(10.0);
newMarker.name = "New Marker";
newMarker.comments = "Added by script";
$.writeln("Marker created at 10 seconds");`,

    "Delete All Sequence Markers": `// Delete all markers from sequence
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
while (marker) {
    var nextMarker = markers.getNextMarker(marker);
    markers.deleteMarker(marker);
    marker = nextMarker;
}
$.writeln("All markers deleted");`,

    "Set Marker Color": `// Set marker color
var markers = app.project.activeSequence.markers;
var marker = markers.getFirstMarker();
if (marker) {
    marker.setColorByIndex(3); // Set to Lavender
    $.writeln("Marker color changed");
}`,

    // ============ TIMELINE/TRACKS ============
    "Get All Video Tracks Info": `// List all video tracks
var videoTracks = app.project.activeSequence.videoTracks;
$.writeln("Video Tracks: " + videoTracks.numTracks);

for (var i = 0; i < videoTracks.numTracks; i++) {
    var track = videoTracks[i];
    $.writeln("Track " + (i+1) + ": " + track.name);
    $.writeln("  Clips: " + track.clips.numItems);
    $.writeln("  Muted: " + track.isMuted());
}`,

    "Get All Clips on Track": `// List all clips on video track 1
var track = app.project.activeSequence.videoTracks[0];
var clips = track.clips;

$.writeln("Clips on " + track.name + ": " + clips.numItems);

for (var i = 0; i < clips.numItems; i++) {
    var clip = clips[i];
    $.writeln("  Clip " + i + ": " + clip.name);
    $.writeln("    Start: " + clip.start.seconds + "s");
    $.writeln("    End: " + clip.end.seconds + "s");
    $.writeln("    Duration: " + clip.duration.seconds + "s");
}`,

    "Insert Clip to Sequence": `// Insert clip at 5 seconds
var projectItem = app.project.rootItem.children[0];
var sequence = app.project.activeSequence;
var time = "5.0"; // Time in seconds
var videoTrack = 0;
var audioTrack = 0;

sequence.insertClip(projectItem, time, videoTrack, audioTrack);
$.writeln("Clip inserted");`,

    "Overwrite Clip in Sequence": `// Overwrite at 10 seconds
var projectItem = app.project.rootItem.children[0];
var sequence = app.project.activeSequence;
var time = "10.0";
var videoTrack = 0;
var audioTrack = 0;

sequence.overwriteClip(projectItem, time, videoTrack, audioTrack);
$.writeln("Clip overwritten");`,

    // ============ SOURCE MONITOR ============
    "Open Clip in Source Monitor": `// Open project item in Source Monitor
var item = app.project.rootItem.children[0];
app.sourceMonitor.openProjectItem(item);
$.writeln("Opened in Source Monitor: " + item.name);`,

    "Get Source Monitor Position": `// Get Source Monitor playhead position
var position = app.sourceMonitor.getPosition();
$.writeln("Source Monitor Position: " + position.seconds + "s");`,

    "Play Source Monitor": `// Play Source Monitor at normal speed
app.sourceMonitor.play(1.0); // 1.0 = normal speed
$.writeln("Source Monitor playing");`,

    // ============ MEDIA ENCODER ============
    "Encode Sequence with AME": `// Send sequence to Adobe Media Encoder
var seq = app.project.activeSequence;
var outputPath = "C:/Output/render.mp4";
var presetPath = "C:/Presets/H264.epr";
var workAreaType = 0; // 0=entire, 1=in-out, 2=work area
var removeOnComplete = 0;

app.encoder.encodeSequence(
    seq,
    outputPath,
    presetPath,
    workAreaType,
    removeOnComplete
);
$.writeln("Added to AME queue");`,

    "Launch Adobe Media Encoder": `// Launch Adobe Media Encoder
app.encoder.launchEncoder();
$.writeln("Adobe Media Encoder launched");`,

    "Start AME Batch": `// Start batch rendering in AME
app.encoder.startBatch();
$.writeln("Batch rendering started");`,

    // ============ APPLICATION INFO ============
    "Get Premiere Pro Version": `// Get application version info
$.writeln("Premiere Pro Version: " + app.version);
$.writeln("Build: " + app.build);
$.writeln("Path: " + app.path);`,

    "Get Application Paths": `// Get application preference paths
var prefPath = app.getAppPrefPath();
var sysPrefPath = app.getAppSystemPrefPath();
$.writeln("Preferences: " + prefPath);
$.writeln("System Prefs: " + sysPrefPath);`,

    "Get Available Workspaces": `// List all available workspaces
var workspaces = app.getWorkspaces();
$.writeln("Available Workspaces:");
for (var i = 0; i < workspaces.length; i++) {
    $.writeln("  " + workspaces[i]);
}`,

    // ============ ADVANCED ============
    "Export AAF": `// Export sequence as AAF
var seq = app.project.activeSequence;
var outputPath = "C:/Export/sequence.aaf";
var mixdownVideo = 0;
var explodeToMono = 0;
var sampleRate = 48000;
var bitsPerSample = 16;
var embedAudio = 1;
var audioFileFormat = 0;
var trimSources = 0;
var handleFrames = 0;

app.project.exportAAF(
    seq, outputPath, mixdownVideo, explodeToMono,
    sampleRate, bitsPerSample, embedAudio,
    audioFileFormat, trimSources, handleFrames
);
$.writeln("AAF export complete");`,

    "Auto-Reframe Sequence": `// Create auto-reframed version for social media
var seq = app.project.activeSequence;
var targetWidth = 1080;
var targetHeight = 1920; // Vertical video
var motionPreset = 1; // Default motion tracking
var newName = seq.name + " (Vertical)";

seq.createAutoReframedSequence(
    targetWidth,
    targetHeight,
    motionPreset,
    newName
);
$.writeln("Auto-reframed sequence created");`,

    "Detect Scene Cuts": `// Detect scene cuts in clip (requires QE DOM)
app.enableQE();
var qeSeq = qe.project.getActiveSequence();
var track = qeSeq.getVideoTrackAt(0);
var clip = track.getItemAt(0);

// Run scene edit detection
clip.performSceneEditDetection();
$.writeln("Scene detection started");`,

    "Safe Sequence Operation": `// Safely access sequence with error checking
try {
    var project = app.project;
    if (!project) {
        $.writeln("ERROR: No project open");
    } else {
        var seq = project.activeSequence;
        if (!seq) {
            $.writeln("ERROR: No active sequence");
        } else {
            $.writeln("Sequence: " + seq.name);
            $.writeln("Duration: " + seq.end);
        }
    }
} catch (e) {
    $.writeln("ERROR: " + e.toString());
}`,

    // ============ UTILITIES ============
    "Time Conversion Utility": `// Convert between ticks and seconds
var seq = app.project.activeSequence;
var timebase = parseFloat(seq.timebase);

// Seconds to ticks
var seconds = 10.0;
var ticks = (seconds * timebase).toString();
$.writeln(seconds + " seconds = " + ticks + " ticks");

// Ticks to seconds
var ticksValue = "2540160000000";
var secondsValue = parseInt(ticksValue) / timebase;
$.writeln(ticksValue + " ticks = " + secondsValue + " seconds");`,

    "Write to Events Panel": `// Write messages to Events panel
app.setSDKEventMessage("This is an info message", "info");
app.setSDKEventMessage("This is a warning", "warning");
app.setSDKEventMessage("This is an error", "error");
$.writeln("Messages sent to Events panel");`,

    "Debug Console Output": `// Multiple debug output methods
$.writeln("Output to ESTK console");
app.trace("Output to Premiere debug console");
app.setSDKEventMessage("Output to Events panel", "info");`,

    "Get System Information": `// Get system and project information
$.writeln("=== System Info ===");
$.writeln("OS: " + $.os);
$.writeln("Locale: " + $.locale);
$.writeln("Build: " + $.build);
$.writeln("Version: " + $.version);

$.writeln("\\n=== Premiere Info ===");
$.writeln("Version: " + app.version);
$.writeln("Build: " + app.build);

$.writeln("\\n=== Project Info ===");
if (app.project) {
    $.writeln("Name: " + app.project.name);
    $.writeln("Path: " + app.project.path);
    $.writeln("Sequences: " + app.project.sequences.numSequences);
}`
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ENHANCED_CODE_SNIPPETS;
} else {
    window.ENHANCED_CODE_SNIPPETS = ENHANCED_CODE_SNIPPETS;
}
