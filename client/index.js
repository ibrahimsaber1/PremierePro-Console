// client/index.js - Enhanced main application logic
// Initialize the CSInterface
const csInterface = new CSInterface();

// Get DOM elements
const codeInput = document.getElementById('code-input');
const consoleOutput = document.getElementById('console-output');
const executeButton = document.getElementById('execute-button');
const clearConsoleButton = document.getElementById('clear-console');
const snippetsButton = document.getElementById('snippets-button');
const helpButton = document.getElementById('help-button');

// Autocomplete instance
let autocomplete = null;

// Enhanced code editing functionality
function setupCodeEditor() {
    // Tab support with smart indentation
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
                    currentPos += lines[i].length + 1;
                }
                
                if (lines[currentLine].startsWith('    ')) {
                    lines[currentLine] = lines[currentLine].substring(4);
                    this.value = lines.join('\n');
                    this.selectionStart = Math.max(start - 4, currentPos - lines.slice(0, currentLine).join('\n').length - currentLine);
                    this.selectionEnd = Math.max(end - 4, this.selectionStart);
                }
            } else {
                // Tab: Add indentation
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        }
        
        // Auto-close brackets and quotes
        if (['(', '[', '{', '"', "'"].includes(e.key)) {
            const closingChar = {
                '(': ')',
                '[': ']',
                '{': '}',
                '"': '"',
                "'": "'"
            }[e.key];
            
            const start = this.selectionStart;
            const end = this.selectionEnd;
            
            if (start === end) {
                setTimeout(() => {
                    this.value = this.value.substring(0, start + 1) + closingChar + this.value.substring(start + 1);
                    this.selectionStart = this.selectionEnd = start + 1;
                }, 0);
            }
        }
    });
    
    // Auto-indentation on Enter
    codeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const start = this.selectionStart;
            const lines = this.value.substring(0, start).split('\n');
            const currentLine = lines[lines.length - 1];
            const indent = currentLine.match(/^\s*/)[0];
            
            // Add extra indent after opening braces
            const extraIndent = currentLine.trim().endsWith('{') ? '    ' : '';
            
            setTimeout(() => {
                const newStart = this.selectionStart;
                this.value = this.value.substring(0, newStart) + indent + extraIndent + this.value.substring(newStart);
                this.selectionStart = this.selectionEnd = newStart + indent.length + extraIndent.length;
            }, 0);
        }
    });
}

// Initialize autocomplete when DOM is loaded
function initializeAutocomplete() {
    if (typeof window.EXTENDSCRIPT_API !== 'undefined' && typeof ExtendScriptAutocomplete !== 'undefined') {
        autocomplete = new ExtendScriptAutocomplete(codeInput);
        updateAutocompleteStatus('Autocomplete: Ready');
        console.log('Autocomplete initialized successfully');
    } else {
        // Retry after a short delay
        setTimeout(initializeAutocomplete, 100);
    }
}

// Update autocomplete status
function updateAutocompleteStatus(message) {
    const statusElement = document.getElementById('autocomplete-status');
    if (statusElement) {
        statusElement.textContent = message;
    }
}

// Execute code function with enhanced error handling
function executeCode() {
    const code = codeInput.value.trim();
    
    if (!code) return;
    
    // Add command to console output
    const commandEntry = document.createElement('div');
    commandEntry.className = 'output-entry';
    
    const commandLine = document.createElement('div');
    commandLine.className = 'command';
    commandLine.textContent = '> ' + (code.length > 100 ? code.substring(0, 100) + '...' : code);
    commandEntry.appendChild(commandLine);
    
    // Create a placeholder for the result
    const resultLine = document.createElement('div');
    resultLine.className = 'result';
    resultLine.innerHTML = '<span style="color: #61DAFB;">Executing...</span>';
    commandEntry.appendChild(resultLine);
    
    consoleOutput.appendChild(commandEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
    
    // Show execution start time
    const startTime = Date.now();
    
    // Encode the code properly for passing to ExtendScript
    const encodedCode = encodeURIComponent(code);
    
    // Execute the code in ExtendScript
    csInterface.evalScript(`executeConsoleCode(decodeURIComponent("${encodedCode}"))`, function(result) {
        const executionTime = Date.now() - startTime;
        
        if (result.startsWith('ERROR:')) {
            resultLine.className = 'error';
            resultLine.innerHTML = `
                <div>${result.substring(6)}</div>
                <div style="font-size: 10px; color: #888; margin-top: 4px;">Execution time: ${executionTime}ms</div>
            `;
        } else {
            resultLine.className = 'result';
            resultLine.innerHTML = `
                <div>${formatResult(result)}</div>
                <div style="font-size: 10px; color: #888; margin-top: 4px;">Execution time: ${executionTime}ms</div>
            `;
        }
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    });
}

// Enhanced result formatting
function formatResult(result) {
    // Try to parse as JSON for better formatting
    try {
        const parsed = JSON.parse(result);
        if (typeof parsed === 'object' && parsed !== null) {
            return `<pre style="color: #98C379; font-family: inherit; margin: 0; white-space: pre-wrap;">${JSON.stringify(parsed, null, 2)}</pre>`;
        }
    } catch (e) {
        // Not JSON, return as-is with syntax highlighting
    }
    
    // Basic syntax highlighting for common patterns
    let formatted = result;
    
    // Highlight strings
    formatted = formatted.replace(/"([^"]*)"/g, '<span style="color: #98C379;">"$1"</span>');
    
    // Highlight numbers
    formatted = formatted.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #D19A66;">$1</span>');
    
    // Highlight booleans
    formatted = formatted.replace(/\b(true|false)\b/g, '<span style="color: #61DAFB;">$1</span>');
    
    // Highlight null/undefined
    formatted = formatted.replace(/\b(null|undefined)\b/g, '<span style="color: #E06C75;">$1</span>');
    
    return formatted;
}

// Insert predefined code snippets
function insertCodeSnippet(snippet) {
    const cursorPos = codeInput.selectionStart;
    const textBefore = codeInput.value.substring(0, cursorPos);
    const textAfter = codeInput.value.substring(codeInput.selectionEnd);
    
    codeInput.value = textBefore + snippet + textAfter;
    codeInput.focus();
    
    // Position cursor at end of inserted snippet
    const newPos = cursorPos + snippet.length;
    codeInput.setSelectionRange(newPos, newPos);
    
    // Trigger autocomplete if available
    if (autocomplete) {
        setTimeout(() => autocomplete.processInput(), 100);
    }
}

// Create enhanced snippets menu with categories
function createSnippetsMenu() {
    const existingMenu = document.getElementById('snippets-menu');
    if (existingMenu) existingMenu.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'snippets-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const menu = document.createElement('div');
    menu.id = 'snippets-menu';
    menu.className = 'snippets-menu';
    menu.style.cssText = `
        background: #2D2D2D;
        border: 1px solid #555;
        border-radius: 8px;
        padding: 0;
        max-height: 70vh;
        overflow: hidden;
        max-width: 80vw;
        min-width: 600px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.6);
        display: flex;
        flex-direction: column;
    `;
    
    // Header
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 16px 20px;
        border-bottom: 1px solid #444;
        background: #3D3D3D;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    
    const title = document.createElement('h3');
    title.textContent = 'ExtendScript Code Snippets';
    title.style.cssText = `
        margin: 0;
        color: #E0E0E0;
        font-size: 16px;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #E0E0E0;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    menu.appendChild(header);
    
    // Search box
    const searchContainer = document.createElement('div');
    searchContainer.style.cssText = `
        padding: 12px 20px;
        border-bottom: 1px solid #444;
        background: #333;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search snippets...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 8px 12px;
        background: #1E1E1E;
        border: 1px solid #555;
        border-radius: 4px;
        color: #E0E0E0;
        font-size: 13px;
        font-family: inherit;
    `;
    
    searchContainer.appendChild(searchInput);
    menu.appendChild(searchContainer);
    
    // Content area
    const content = document.createElement('div');
    content.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding: 12px 0;
    `;
    
    // Get enhanced snippets
    const snippets = window.ENHANCED_CODE_SNIPPETS || {};
    
    // Categorize snippets
    const categories = {
        'Basic Operations': ['Get Active Project', 'Get Active Sequence', 'Get Project Name', 'Get Project Path'],
        'Sequence Operations': ['Get Sequence Settings', 'Get Sequence In/Out Points', 'Set Sequence In/Out Points', 'Get CTI Position', 'Set CTI Position', 'Export Sequence as Media'],
        'Project Items': ['List All Project Items', 'Get Project Item Media Path', 'Create New Bin', 'Import Files to Project', 'Set Project Item Color Label'],
        'Markers': ['Get All Sequence Markers', 'Create Sequence Marker', 'Delete All Sequence Markers', 'Set Marker Color'],
        'Timeline & Tracks': ['Get All Video Tracks Info', 'Get All Clips on Track', 'Insert Clip to Sequence', 'Overwrite Clip in Sequence'],
        'Source Monitor': ['Open Clip in Source Monitor', 'Get Source Monitor Position', 'Play Source Monitor'],
        'Media Encoder': ['Encode Sequence with AME', 'Launch Adobe Media Encoder', 'Start AME Batch Render'],
        'Application Info': ['Get Premiere Pro Version', 'Get Application Paths', 'Get Available Workspaces'],
        'Advanced': ['Export AAF', 'Auto-Reframe Sequence', 'Detect Scene Cuts', 'Safe Sequence Operation'],
        'Utilities': ['Time Conversion Utility', 'Write to Events Panel', 'Debug Console Output', 'Get System Information']
    };
    
    function renderSnippets(filterText = '') {
        content.innerHTML = '';
        
        Object.keys(categories).forEach(categoryName => {
            const categorySnippets = categories[categoryName].filter(name => 
                snippets[name] && (!filterText || 
                name.toLowerCase().includes(filterText.toLowerCase()) ||
                snippets[name].toLowerCase().includes(filterText.toLowerCase()))
            );
            
            if (categorySnippets.length === 0) return;
            
            // Category header
            const categoryHeader = document.createElement('div');
            categoryHeader.style.cssText = `
                padding: 8px 20px;
                background: #3A3A3A;
                border-bottom: 1px solid #444;
                font-weight: bold;
                color: #61DAFB;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            `;
            categoryHeader.textContent = categoryName;
            content.appendChild(categoryHeader);
            
            // Category items
            categorySnippets.forEach(name => {
                const item = document.createElement('div');
                item.style.cssText = `
                    padding: 12px 20px;
                    cursor: pointer;
                    border-bottom: 1px solid #333;
                    transition: background-color 0.1s;
                `;
                
                const itemName = document.createElement('div');
                itemName.style.cssText = `
                    font-weight: bold;
                    color: #E0E0E0;
                    margin-bottom: 4px;
                    font-size: 13px;
                `;
                itemName.textContent = name;
                
                const itemPreview = document.createElement('div');
                itemPreview.style.cssText = `
                    font-size: 11px;
                    color: #AAA;
                    font-family: 'Consolas', 'Monaco', monospace;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 500px;
                `;
                itemPreview.textContent = snippets[name].split('\n')[0];
                
                item.appendChild(itemName);
                item.appendChild(itemPreview);
                
                item.addEventListener('mouseenter', () => {
                    item.style.backgroundColor = '#404040';
                });
                
                item.addEventListener('mouseleave', () => {
                    item.style.backgroundColor = 'transparent';
                });
                
                item.addEventListener('click', () => {
                    insertCodeSnippet(snippets[name]);
                    overlay.remove();
                });
                
                content.appendChild(item);
            });
        });
        
        // Show "no results" message if filtered and nothing found
        if (filterText && content.children.length === 0) {
            const noResults = document.createElement('div');
            noResults.style.cssText = `
                padding: 20px;
                text-align: center;
                color: #888;
                font-style: italic;
            `;
            noResults.textContent = 'No snippets found matching "' + filterText + '"';
            content.appendChild(noResults);
        }
    }
    
    // Initial render
    renderSnippets();
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        renderSnippets(e.target.value);
    });
    
    menu.appendChild(content);
    overlay.appendChild(menu);
    document.body.appendChild(overlay);
    
    // Focus search input
    setTimeout(() => searchInput.focus(), 100);
    
    // Close handlers
    closeBtn.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function handleKeyDown(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', handleKeyDown);
        }
    });
}

// Event listeners
executeButton.addEventListener('click', executeCode);

clearConsoleButton.addEventListener('click', function() {
    consoleOutput.innerHTML = '';
    showWelcomeMessage();
});

if (snippetsButton) {
    snippetsButton.addEventListener('click', createSnippetsMenu);
}

if (helpButton) {
    helpButton.addEventListener('click', showHelpMessage);
}

// Enhanced keyboard shortcuts
codeInput.addEventListener('keydown', function(e) {
    // Execute code with Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        executeCode();
        e.preventDefault();
    }
    
    // Manual autocomplete trigger with Ctrl+Space
    if (e.ctrlKey && e.key === ' ') {
        e.preventDefault();
        if (autocomplete) {
            autocomplete.processInput();
            updateAutocompleteStatus('Autocomplete: Triggered manually');
        }
    }
    
    // Snippets menu with Ctrl+Shift+P
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        createSnippetsMenu();
    }
    
    // Quick save with Ctrl+S (save content to localStorage for persistence)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        try {
            localStorage.setItem('premierePro_console_content', codeInput.value);
            showTemporaryMessage('Code saved locally', 'info');
        } catch (err) {
            console.warn('Could not save to localStorage:', err);
        }
    }
    
    // Load saved content with Ctrl+O
    if (e.ctrlKey && e.key === 'o') {
        e.preventDefault();
        try {
            const saved = localStorage.getItem('premierePro_console_content');
            if (saved) {
                codeInput.value = saved;
                showTemporaryMessage('Code loaded from local storage', 'info');
            }
        } catch (err) {
            console.warn('Could not load from localStorage:', err);
        }
    }
});

// Show temporary status messages
function showTemporaryMessage(message, type = 'info') {
    const statusElement = document.getElementById('autocomplete-status');
    if (statusElement) {
        const originalText = statusElement.textContent;
        const originalColor = statusElement.style.color;
        
        statusElement.textContent = message;
        statusElement.style.color = type === 'error' ? '#E06C75' : type === 'warning' ? '#D19A66' : '#98C379';
        
        setTimeout(() => {
            statusElement.textContent = originalText;
            statusElement.style.color = originalColor;
        }, 2000);
    }
}

// Enhanced welcome message
function showWelcomeMessage() {
    const welcomeEntry = document.createElement('div');
    welcomeEntry.className = 'output-entry welcome-entry';
    
    const welcomeLine = document.createElement('div');
    welcomeLine.className = 'command';
    welcomeEntry.appendChild(welcomeLine);
    
    const infoLine = document.createElement('div');
    infoLine.className = 'result';
    infoLine.innerHTML = `
    `;
    welcomeEntry.appendChild(infoLine);
    
    consoleOutput.appendChild(welcomeEntry);
}

// Enhanced help command
function showHelpMessage() {
    const helpEntry = document.createElement('div');
    helpEntry.className = 'output-entry';
    
    const helpLine = document.createElement('div');
    helpLine.className = 'command';
    helpLine.innerHTML = `<span style="color: #61DAFB;">📚</span> ExtendScript API Reference & Features`;
    helpEntry.appendChild(helpLine);
    
    const helpContent = document.createElement('div');
    helpContent.className = 'result';
    helpContent.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 8px;">
            <div>
                <div style="color: #61DAFB; font-weight: bold; margin-bottom: 8px;">📋 Available Objects:</div>
                <div style="font-size: 11px; line-height: 1.4;">
                    <div><strong>app.project</strong> - Current project and sequences</div>
                    <div><strong>app.encoder</strong> - Adobe Media Encoder integration</div>
                    <div><strong>app.sourceMonitor</strong> - Source monitor control</div>
                    <div><strong>app.properties</strong> - Application preferences</div>
                    <div><strong>app.production</strong> - Team Projects (if available)</div>
                    <div><strong>app.anywhere</strong> - Legacy Team Projects</div>
                    <div><strong>app.metadata</strong> - Metadata operations</div>
                </div>
                
                <div style="color: #98C379; font-weight: bold; margin: 12px 0 8px 0;">🎯 Common Operations:</div>
                <div style="font-size: 11px; line-height: 1.4;">
                    <div>• Access sequence: <code>app.project.activeSequence</code></div>
                    <div>• Get markers: <code>sequence.markers</code></div>
                    <div>• List tracks: <code>sequence.videoTracks</code></div>
                    <div>• Import files: <code>app.project.importFiles()</code></div>
                    <div>• Export media: <code>sequence.exportAsMediaDirect()</code></div>
                </div>
            </div>
            
            <div>
                <div style="color: #D19A66; font-weight: bold; margin-bottom: 8px;">⭐ Advanced Features:</div>
                <div style="font-size: 11px; line-height: 1.4;">
                    <div><strong>Smart Autocomplete</strong> - Context-aware suggestions</div>
                    <div><strong>Parameter Hints</strong> - Function signature help</div>
                    <div><strong>Error Handling</strong> - Detailed error messages</div>
                    <div><strong>Code Snippets</strong> - Pre-built examples</div>
                    <div><strong>Syntax Highlighting</strong> - Enhanced readability</div>
                    <div><strong>Auto-indentation</strong> - Smart code formatting</div>
                </div>
                
                <div style="color: #E06C75; font-weight: bold; margin: 12px 0 8px 0;">🔧 Constants Available:</div>
                <div style="font-size: 11px; line-height: 1.4;">
                    <div>• <code>ProjectItemType</code> - Item type constants</div>
                    <div>• <code>ScratchDiskType</code> - Scratch disk types</div>
                    <div>• <code>VideoDisplayFormat</code> - Timecode formats</div>
                    <div>• <code>ColorLabelIndex</code> - Color label values</div>
                    <div>• <code>WorkAreaType</code> - Export work area types</div>
                </div>
            </div>
        </div>
        
        <div style="margin-top: 16px; padding: 8px; background: rgba(97, 175, 239, 0.1); border-radius: 4px; border-left: 3px solid #61DAFB;">
            <div style="font-size: 11px; color: #BBB;">
                <strong>💡 Pro Tip:</strong> Use the autocomplete system by typing object names followed by a dot (.) 
                to see available properties and methods. The system provides detailed descriptions, 
                parameter information, and return types for all API functions.
            </div>
        </div>
    `;
    helpEntry.appendChild(helpContent);
    
    consoleOutput.appendChild(helpEntry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Enhanced command detection
const originalExecuteCode = executeCode;
executeCode = function() {
    const code = codeInput.value.trim().toLowerCase();
    
    // Handle special commands
    if (code === 'help' || code === 'help()') {
        showHelpMessage();
        return;
    }
    
    if (code === 'clear' || code === 'cls') {
        consoleOutput.innerHTML = '';
        showWelcomeMessage();
        return;
    }
    
    if (code === 'snippets') {
        createSnippetsMenu();
        return;
    }
    
    if (code.startsWith('save ')) {
        const name = code.substring(5).trim();
        try {
            localStorage.setItem(`premiere_snippet_${name}`, codeInput.value);
            showTemporaryMessage(`Snippet saved as "${name}"`, 'info');
        } catch (err) {
            showTemporaryMessage('Failed to save snippet', 'error');
        }
        return;
    }
    
    if (code.startsWith('load ')) {
        const name = code.substring(5).trim();
        try {
            const snippet = localStorage.getItem(`premiere_snippet_${name}`);
            if (snippet) {
                codeInput.value = snippet;
                showTemporaryMessage(`Snippet "${name}" loaded`, 'info');
            } else {
                showTemporaryMessage(`Snippet "${name}" not found`, 'error');
            }
        } catch (err) {
            showTemporaryMessage('Failed to load snippet', 'error');
        }
        return;
    }
    
    // Execute normal code
    originalExecuteCode();
};

// Load saved content on startup
function loadSavedContent() {
    try {
        const saved = localStorage.getItem('premierePro_console_content');
        if (saved && saved.trim()) {
            codeInput.value = saved;
        }
    } catch (err) {
        console.warn('Could not load saved content:', err);
    }
}

// Initialize everything when the page loads
window.addEventListener('load', function() {
    // Setup enhanced code editor
    setupCodeEditor();
    
    // Show welcome message
    showWelcomeMessage();
    
    // Initialize autocomplete
    initializeAutocomplete();
    
    // Load any saved content
    loadSavedContent();
    
    // Focus the input
    codeInput.focus();
    
    // Update status periodically if autocomplete is active
    setInterval(() => {
        if (autocomplete && autocomplete.isVisible) {
            updateAutocompleteStatus(`Autocomplete: ${autocomplete.currentSuggestions.length} suggestions`);
        }
    }, 1000);
});

// Handle page unload to save content
window.addEventListener('beforeunload', function() {
    try {
        if (codeInput.value.trim()) {
            localStorage.setItem('premierePro_console_content', codeInput.value);
        }
    } catch (err) {
        console.warn('Could not save content on unload:', err);
    }
});