// client/index.js - Enhanced with autocomplete functionality
// Initialize the CSInterface
const csInterface = new CSInterface();

// Get DOM elements
const codeInput = document.getElementById('code-input');
const consoleOutput = document.getElementById('console-output');
const executeButton = document.getElementById('execute-button');
const clearConsoleButton = document.getElementById('clear-console');
const quickCommandButtons = document.querySelectorAll('.command-buttons button');

// Autocomplete instance
let autocomplete = null;

// Enhanced code editing functionality
function setupCodeEditor() {
    // Tab support
    codeInput.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            
            const start = this.selectionStart;
            const end = this.selectionEnd;
            
            if (e.shiftKey) {
                // Shift+Tab: Remove indentation
                const lines = this.value.split('\n');
                let currentLine = 0;
                let currentPos = 0;
                
                for (let i = 0; i < lines.length; i++) {
                    if (start >= currentPos && start <= currentPos + lines[i].length) {
                        currentLine = i;
                        break;
                    }
                    currentPos += lines[i].length + 1; // +1 for newline
                }
                
                if (lines[currentLine].startsWith('    ')) {
                    lines[currentLine] = lines[currentLine].substring(4);
                    this.value = lines.join('\n');
                    this.selectionStart = start - 4;
                    this.selectionEnd = end - 4;
                }
            } else {
                // Tab: Add indentation
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        }
    });
}

// Initialize autocomplete when DOM is loaded
function initializeAutocomplete() {
    // Wait for API data to be available
    if (typeof window.EXTENDSCRIPT_API !== 'undefined') {
        autocomplete = new ExtendScriptAutocomplete(codeInput);
        console.log('Autocomplete initialized successfully');
    } else {
        // Retry after a short delay
        setTimeout(initializeAutocomplete, 100);
    }
}

// Execute code function
function executeCode() {
    const code = codeInput.value.trim();
    
    if (!code) return;
    
    // Add command to console output
    const commandEntry = document.createElement('div');
    commandEntry.className = 'output-entry';
    
    const commandLine = document.createElement('div');
    commandLine.className = 'command';
    commandLine.textContent = '> ' + code;
    commandEntry.appendChild(commandLine);
    
    // Create a placeholder for the result
    const resultLine = document.createElement('div');
    resultLine.className = 'result';
    resultLine.textContent = 'Executing...';
    commandEntry.appendChild(resultLine);
    
    consoleOutput.appendChild(commandEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight; // Scroll to bottom
    
    // Encode the code properly for passing to ExtendScript
    const encodedCode = encodeURIComponent(code);
    
    // Execute the code in ExtendScript
    csInterface.evalScript(`executeConsoleCode(decodeURIComponent("${encodedCode}"))`, function(result) {
        if (result.startsWith('ERROR:')) {
            resultLine.className = 'error';
            resultLine.textContent = result.substring(6); // Remove the 'ERROR:' prefix
        } else {
            resultLine.textContent = result;
        }
        consoleOutput.scrollTop = consoleOutput.scrollHeight; // Scroll to bottom again after result
    });
}

// Insert predefined code snippets
function insertCodeSnippet(snippet) {
    const cursorPos = codeInput.selectionStart;
    const textBefore = codeInput.value.substring(0, cursorPos);
    const textAfter = codeInput.value.substring(codeInput.selectionEnd);
    
    codeInput.value = textBefore + snippet + textAfter;
    codeInput.focus();
    codeInput.setSelectionRange(cursorPos + snippet.length, cursorPos + snippet.length);
}

// Predefined code snippets for quick insertion
const codeSnippets = {
    'Get Active Sequence': 'app.project.activeSequence',
    'Get Project Root': 'app.project.rootItem',
    'Count Project Items': 'app.project.rootItem.children.numItems',
    'Get Video Tracks': 'app.project.activeSequence.videoTracks',
    'Get Audio Tracks': 'app.project.activeSequence.audioTracks',
    'Get Sequence Markers': 'app.project.activeSequence.markers',
    'Save Project': 'app.project.save()',
    'Import Files': `app.project.importFiles(
    ["path/to/file.mov"], // filePaths array
    true,                 // suppressUI
    app.project.rootItem, // targetBin
    false                 // importAsNumberedStills
)`,
    'Create New Sequence': `app.project.newSequence(
    "My New Sequence",           // name
    "path/to/sequence.sqpreset"  // pathToSequencePreset
)`,
    'Export to AME': `app.encoder.encodeSequence(
    app.project.activeSequence,  // sequence
    "path/to/output.mp4",        // outputPath
    "path/to/preset.epr",        // presetPath
    0,                           // workArea (0=entire, 1=in-out, 2=work area)
    1                            // removeUponCompletion
)`,
    'Get Markers Info': `var sequence = app.project.activeSequence;
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
result`,
    'List All Clips': `var sequence = app.project.activeSequence;
var videoTracks = sequence.videoTracks;
var result = [];
for (var i = 0; i < videoTracks.numTracks; i++) {
    var track = videoTracks[i];
    var clips = track.clips;
    for (var j = 0; j < clips.numItems; j++) {
        result.push({
            name: clips[j].name,
            track: i,
            start: clips[j].start.seconds,
            end: clips[j].end.seconds
        });
    }
}
result`
};

// Create quick snippets menu
function createSnippetsMenu() {
    const existingMenu = document.getElementById('snippets-menu');
    if (existingMenu) existingMenu.remove();
    
    const menu = document.createElement('div');
    menu.id = 'snippets-menu';
    menu.className = 'snippets-menu';
    menu.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #2D2D2D;
        border: 1px solid #555;
        border-radius: 6px;
        padding: 10px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 10001;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    `;
    
    const header = document.createElement('div');
    header.style.cssText = `
        font-weight: bold;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid #444;
        color: #E0E0E0;
    `;
    header.textContent = 'Code Snippets';
    menu.appendChild(header);
    
    Object.keys(codeSnippets).forEach(name => {
        const item = document.createElement('div');
        item.style.cssText = `
            padding: 8px;
            cursor: pointer;
            border-radius: 3px;
            margin-bottom: 2px;
            color: #E0E0E0;
            font-size: 12px;
        `;
        item.textContent = name;
        
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#404040';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
        });
        
        item.addEventListener('click', () => {
            insertCodeSnippet(codeSnippets[name]);
            document.body.removeChild(menu);
        });
        
        menu.appendChild(item);
    });
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
        margin-top: 10px;
        padding: 6px 12px;
        background: #4D4D4D;
        color: #E0E0E0;
        border: 1px solid #666;
        border-radius: 3px;
        cursor: pointer;
        font-size: 11px;
    `;
    closeButton.addEventListener('click', () => {
        document.body.removeChild(menu);
    });
    menu.appendChild(closeButton);
    
    document.body.appendChild(menu);
    
    // Close on click outside
    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                if (document.body.contains(menu)) {
                    document.body.removeChild(menu);
                }
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

// Event listeners
executeButton.addEventListener('click', executeCode);

clearConsoleButton.addEventListener('click', function() {
    consoleOutput.innerHTML = '';
});

// Allow executing code with Ctrl+Enter or Cmd+Enter
codeInput.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        executeCode();
        e.preventDefault();
    }
    
    // Ctrl+Space for manual autocomplete trigger
    if (e.ctrlKey && e.key === ' ') {
        e.preventDefault();
        if (autocomplete) {
            autocomplete.processInput();
        }
    }
    
    // Ctrl+Shift+P for snippets menu
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        createSnippetsMenu();
    }
});

// Quick commands
quickCommandButtons.forEach(button => {
    button.addEventListener('click', function() {
        const command = this.getAttribute('data-command');
        codeInput.value = command;
        executeCode();
    });
});

// Enhanced welcome message with autocomplete info
function showWelcomeMessage() {
    const welcomeEntry = document.createElement('div');
    welcomeEntry.className = 'output-entry';
    
    const welcomeLine = document.createElement('div');
    welcomeLine.className = 'command';
    welcomeLine.textContent = '> Welcome to Premiere Pro Console with Autocomplete';
    welcomeEntry.appendChild(welcomeLine);
    
    const infoLine = document.createElement('div');
    infoLine.className = 'result';
    infoLine.innerHTML = `ExtendScript Console with intelligent autocomplete support<br>
• Type code and get suggestions as you type<br>
• Press Ctrl+Enter (Cmd+Enter) to execute<br>
• Press Ctrl+Space to manually trigger autocomplete<br>
• Press Ctrl+Shift+P for code snippets<br>
• Start typing "app." to see available objects`;
    welcomeEntry.appendChild(infoLine);
    
    consoleOutput.appendChild(welcomeEntry);
}

// Add a help command
function showHelpMessage() {
    const helpEntry = document.createElement('div');
    helpEntry.className = 'output-entry';
    
    const helpLine = document.createElement('div');
    helpLine.className = 'command';
    helpLine.textContent = '> Keyboard Shortcuts and Features';
    helpEntry.appendChild(helpLine);
    
    const helpContent = document.createElement('div');
    helpContent.className = 'result';
    helpContent.innerHTML = `<strong>Keyboard Shortcuts:</strong><br>
• Ctrl+Enter / Cmd+Enter: Execute code<br>
• Ctrl+Space: Manual autocomplete<br>
• Ctrl+Shift+P: Code snippets menu<br>
• Tab: Indent code<br>
• Shift+Tab: Unindent code<br>
• Arrow Keys: Navigate autocomplete suggestions<br>
• Enter/Tab: Accept autocomplete suggestion<br>
• Escape: Close autocomplete<br><br>
<strong>Available Objects:</strong><br>
• app.project - Current project<br>
• app.encoder - Adobe Media Encoder<br>
• app.anywhere - Team Projects<br>
• app.metadata - Metadata operations<br>
• app.production - Production management<br>
• app.properties - Application properties<br>
• app.sourceMonitor - Source monitor control`;
    helpEntry.appendChild(helpContent);
    
    consoleOutput.appendChild(helpContent);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Add help command detection
const originalExecuteCode = executeCode;
executeCode = function() {
    const code = codeInput.value.trim().toLowerCase();
    if (code === 'help' || code === 'help()') {
        showHelpMessage();
        return;
    }
    originalExecuteCode();
};

// Initialize everything when the page loads
window.addEventListener('load', function() {
    // Setup enhanced code editor
    setupCodeEditor();
    
    // Show welcome message
    showWelcomeMessage();
    
    // Initialize autocomplete
    initializeAutocomplete();
    
    // Focus the input
    codeInput.focus();
});