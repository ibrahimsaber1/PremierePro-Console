// Premiere Pro Console - Main Application Logic
(function() {
    'use strict';

    // Initialize CSInterface
    const csInterface = new CSInterface();
    
    // DOM Elements
    const elements = {
        codeInput: document.getElementById('code-input'),
        consoleOutput: document.getElementById('console-output'),
        consoleSearch: document.getElementById('console-search'),
        executeButton: document.getElementById('execute-button'),
        clearButton: document.getElementById('clear-console'),
        snippetsButton: document.getElementById('snippets-button'),
        helpButton: document.getElementById('help-button'),
        formatButton: document.getElementById('format-code'),
        saveButton: document.getElementById('save-code'),
        loadButton: document.getElementById('load-code'),
        statusMessage: document.getElementById('status-message')
    };

    // Application State
    let autocomplete = null;
    let outputHistory = [];
    const STORAGE_KEY = 'ppro_console_saved_code';

    // Initialize Application
    function init() {
        setupCodeEditor();
        initializeAutocomplete();
        setupEventListeners();
        showWelcomeMessage();
        restoreLastSession();
    }

    // Setup Code Editor Features
    function setupCodeEditor() {
        // Tab key handling
        elements.codeInput.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });

        // Auto-close brackets and quotes
        const pairs = {
            '(': ')', '[': ']', '{': '}', '"': '"', "'": "'"
        };

        elements.codeInput.addEventListener('input', function(e) {
            if (e.inputType === 'insertText' && pairs[e.data]) {
                const pos = this.selectionStart;
                const nextChar = this.value[pos];
                
                // Only auto-close if next character is whitespace or closing bracket
                if (!nextChar || /[\s\)\]\}]/.test(nextChar)) {
                    this.value = this.value.substring(0, pos) + 
                                pairs[e.data] + 
                                this.value.substring(pos);
                    this.selectionStart = this.selectionEnd = pos;
                }
            }
        });
    }

    // Initialize Autocomplete System
    function initializeAutocomplete() {
        if (typeof ExtendScriptAutocomplete !== 'undefined' && typeof window.EXTENDSCRIPT_API !== 'undefined') {
            try {
                autocomplete = new ExtendScriptAutocomplete(elements.codeInput);
                updateStatus('Autocomplete ready', 'success');
            } catch (err) {
                console.error('Autocomplete initialization failed:', err);
                updateStatus('Autocomplete unavailable', 'warning');
            }
        } else {
            setTimeout(initializeAutocomplete, 200);
        }
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Execute code
        elements.executeButton.addEventListener('click', executeCode);
        
        // Clear console
        elements.clearButton.addEventListener('click', clearConsole);
        
        // Show snippets
        elements.snippetsButton.addEventListener('click', showSnippetsMenu);
        
        // Show help
        elements.helpButton.addEventListener('click', showHelpPanel);
        
        // Format code
        elements.formatButton.addEventListener('click', formatCode);
        
        // Save code
        elements.saveButton.addEventListener('click', saveCode);
        
        // Load code
        elements.loadButton.addEventListener('click', loadCode);
        
        // Console search
        elements.consoleSearch.addEventListener('input', filterConsoleOutput);

        // Keyboard shortcuts
        elements.codeInput.addEventListener('keydown', handleKeyboardShortcuts);

        // Show docs (ADD THIS)
        elements.docsButton = document.getElementById('docs-button');
        if (elements.docsButton) {
            elements.docsButton.addEventListener('click', () => {
                const apiDocs = new APIDocs();
                apiDocs.show();
            });
        }
    }

    // Handle Keyboard Shortcuts
    function handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + Enter: Execute
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            executeCode();
        }
        
        // Ctrl/Cmd + Space: Trigger autocomplete
        else if (e.ctrlKey && e.key === ' ') {
            e.preventDefault();
            if (autocomplete) {
                autocomplete.processInput();
            }
        }
        
        // Ctrl/Cmd + Shift + P: Snippets
        else if (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
            e.preventDefault();
            showSnippetsMenu();
        }
        
        // Ctrl/Cmd + S: Save
        else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveCode();
        }
        
        // Ctrl/Cmd + O: Load
        else if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            loadCode();
        }
        
        // F1: Help
        else if (e.key === 'F1') {
            e.preventDefault();
            showHelpPanel();
        }

        else if (e.key === 'F2') {
            e.preventDefault();
            const apiDocs = new APIDocs();
            apiDocs.show();
        }

    }

    // Execute Code in ExtendScript
    function executeCode() {
        const code = elements.codeInput.value.trim();
        if (!code) {
            updateStatus('No code to execute', 'warning');
            return;
        }

        const startTime = Date.now();
        updateStatus('Executing...', 'info');

        // Add to output
        const entry = createOutputEntry('command', `> ${code.substring(0, 100)}${code.length > 100 ? '...' : ''}`);
        elements.consoleOutput.appendChild(entry);

        // Execute via CSInterface
        const encodedCode = encodeURIComponent(code);
        csInterface.evalScript(`executeConsoleCode(decodeURIComponent("${encodedCode}"))`, function(result) {
            const executionTime = Date.now() - startTime;
            
            if (result && result.startsWith('ERROR:')) {
                const errorMsg = result.substring(6);
                const errorEntry = createOutputEntry('error', `✖ ${errorMsg}`, `Execution time: ${executionTime}ms`);
                elements.consoleOutput.appendChild(errorEntry);
                updateStatus(`Error: ${errorMsg.substring(0, 30)}...`, 'error');
            } else {
                const resultEntry = createOutputEntry('result', result || 'undefined', `Execution time: ${executionTime}ms`);
                elements.consoleOutput.appendChild(resultEntry);
                updateStatus(`Executed successfully (${executionTime}ms)`, 'success');
            }

            // Scroll to bottom
            elements.consoleOutput.scrollTop = elements.consoleOutput.scrollHeight;
            
            // Store in history
            outputHistory.push({ code, result, timestamp: Date.now() });
        });
    }

    // Create Output Entry Element
    function createOutputEntry(type, content, meta = '') {
        const entry = document.createElement('div');
        entry.className = `output-entry output-${type}`;
        entry.setAttribute('data-timestamp', Date.now());
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'output-content';
        contentDiv.textContent = content;
        entry.appendChild(contentDiv);
        
        if (meta) {
            const metaDiv = document.createElement('div');
            metaDiv.className = 'output-meta';
            metaDiv.textContent = meta;
            entry.appendChild(metaDiv);
        }
        
        return entry;
    }

    // Clear Console
    function clearConsole() {
        elements.consoleOutput.innerHTML = '';
        outputHistory = [];
        showWelcomeMessage();
        updateStatus('Console cleared', 'info');
    }

    // Filter Console Output
    function filterConsoleOutput() {
        const searchTerm = elements.consoleSearch.value.toLowerCase();
        const entries = elements.consoleOutput.querySelectorAll('.output-entry');
        
        let visibleCount = 0;
        entries.forEach(entry => {
            const text = entry.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                entry.style.display = '';
                visibleCount++;
            } else {
                entry.style.display = 'none';
            }
        });
        
        updateStatus(`Found ${visibleCount} matching entries`, 'info');
    }

    // Show Welcome Message
    function showWelcomeMessage() {
        const welcome = document.createElement('div');
        welcome.className = 'welcome-message';
        welcome.innerHTML = `
            <h3>🎬 Welcome to Premiere Pro Console!</h3>
            <p>Execute ExtendScript commands directly in Premiere Pro.</p>
            <p><strong>Quick Start:</strong></p>
            <ul>
                <li>Type <code>app.project.name</code> to get the project name</li>
                <li>Press <kbd>Ctrl+Space</kbd> for autocomplete suggestions</li>
                <li>Press <kbd>Ctrl+Enter</kbd> to execute code</li>
                <li>Click <strong>Snippets</strong> for common code examples</li>
            </ul>
        `;
        elements.consoleOutput.appendChild(welcome);
    }

    // Show Snippets Menu
    function showSnippetsMenu() {
        if (!window.ENHANCED_CODE_SNIPPETS) {
            updateStatus('Snippets not loaded', 'error');
            return;
        }

        const overlay = createOverlay();
        const modal = createModal('Code Snippets', overlay);
        
        // Search input
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Search snippets...';
        searchInput.className = 'modal-search';
        modal.appendChild(searchInput);
        
        // Snippets container
        const container = document.createElement('div');
        container.className = 'snippets-container';
        modal.appendChild(container);
        
        // Render snippets
        const renderSnippets = (filter = '') => {
            container.innerHTML = '';
            const snippets = window.ENHANCED_CODE_SNIPPETS;
            
            Object.keys(snippets).forEach(name => {
                if (filter && !name.toLowerCase().includes(filter.toLowerCase())) {
                    return;
                }
                
                const item = document.createElement('div');
                item.className = 'snippet-item';
                item.innerHTML = `
                    <div class="snippet-name">${name}</div>
                    <div class="snippet-preview">${snippets[name].split('\n')[0]}</div>
                `;
                item.addEventListener('click', () => {
                    insertCodeSnippet(snippets[name]);
                    overlay.remove();
                });
                container.appendChild(item);
            });
            
            if (container.children.length === 0) {
                container.innerHTML = '<div class="no-results">No snippets found</div>';
            }
        };
        
        searchInput.addEventListener('input', (e) => renderSnippets(e.target.value));
        renderSnippets();
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        searchInput.focus();
    }

    // Insert Code Snippet
    function insertCodeSnippet(code) {
        const pos = elements.codeInput.selectionStart;
        const before = elements.codeInput.value.substring(0, pos);
        const after = elements.codeInput.value.substring(elements.codeInput.selectionEnd);
        
        elements.codeInput.value = before + code + after;
        elements.codeInput.focus();
        elements.codeInput.selectionStart = elements.codeInput.selectionEnd = pos + code.length;
        
        updateStatus('Snippet inserted', 'success');
    }

    // Show Help Panel
    function showHelpPanel() {
        const overlay = createOverlay();
        const modal = createModal('Premiere Pro Console Help', overlay);
        modal.style.maxWidth = '700px';
        
        modal.innerHTML += `
            <div class="help-content">
                <section>
                    <h3>🎯 Keyboard Shortcuts</h3>
                    <table class="shortcuts-table">
                        <tr><td><kbd>Ctrl + Enter</kbd></td><td>Execute code</td></tr>
                        <tr><td><kbd>Ctrl + Space</kbd></td><td>Trigger autocomplete</td></tr>
                        <tr><td><kbd>Ctrl + Shift + P</kbd></td><td>Open snippets menu</td></tr>
                        <tr><td><kbd>Ctrl + S</kbd></td><td>Save code to local storage</td></tr>
                        <tr><td><kbd>Ctrl + O</kbd></td><td>Load saved code</td></tr>
                        <tr><td><kbd>F1</kbd></td><td>Show this help panel</td></tr>
                        <tr><td><kbd>Tab</kbd></td><td>Insert 4 spaces</td></tr>
                    </table>
                </section>
                
                <section>
                    <h3>📚 Common Objects</h3>
                    <ul class="api-list">
                        <li><code>app</code> - Application object</li>
                        <li><code>app.project</code> - Current project</li>
                        <li><code>app.project.activeSequence</code> - Active sequence</li>
                        <li><code>app.project.rootItem</code> - Project root folder</li>
                        <li><code>sequence.markers</code> - Sequence markers</li>
                        <li><code>sequence.videoTracks</code> - Video tracks</li>
                        <li><code>sequence.audioTracks</code> - Audio tracks</li>
                    </ul>
                </section>
                
                <section>
                    <h3>💡 Quick Examples</h3>
                    <div class="example-code">
                        <strong>Get project name:</strong>
                        <code>app.project.name</code>
                    </div>
                    <div class="example-code">
                        <strong>Count video tracks:</strong>
                        <code>app.project.activeSequence.videoTracks.numTracks</code>
                    </div>
                    <div class="example-code">
                        <strong>Get all markers:</strong>
                        <code>app.project.activeSequence.markers.numMarkers</code>
                    </div>
                </section>
                
                <section>
                    <h3>🔗 Resources</h3>
                    <p>For complete API documentation, visit:</p>
                    <p><strong>ppro-scripting.docsforadobe.dev</strong></p>
                </section>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    // Format Code (Basic)
    function formatCode() {
        let code = elements.codeInput.value;
        
        // Basic formatting: fix indentation
        const lines = code.split('\n');
        let indentLevel = 0;
        const formatted = [];
        
        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) {
                formatted.push('');
                return;
            }
            
            // Decrease indent for closing braces
            if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            formatted.push('    '.repeat(indentLevel) + trimmed);
            
            // Increase indent for opening braces
            if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
                indentLevel++;
            }
        });
        
        elements.codeInput.value = formatted.join('\n');
        updateStatus('Code formatted', 'success');
    }

    // Save Code to Local Storage
    function saveCode() {
        try {
            localStorage.setItem(STORAGE_KEY, elements.codeInput.value);
            localStorage.setItem(STORAGE_KEY + '_timestamp', Date.now().toString());
            updateStatus('Code saved locally', 'success');
        } catch (err) {
            updateStatus('Failed to save code', 'error');
        }
    }

    // Load Code from Local Storage
    function loadCode() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                elements.codeInput.value = saved;
                const timestamp = localStorage.getItem(STORAGE_KEY + '_timestamp');
                const date = timestamp ? new Date(parseInt(timestamp)).toLocaleString() : 'unknown';
                updateStatus(`Code loaded (saved: ${date})`, 'success');
            } else {
                updateStatus('No saved code found', 'warning');
            }
        } catch (err) {
            updateStatus('Failed to load code', 'error');
        }
    }

    // Restore Last Session
    function restoreLastSession() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                elements.codeInput.value = saved;
            }
        } catch (err) {
            console.warn('Could not restore session:', err);
        }
    }

    // Update Status Message
    function updateStatus(message, type = 'info') {
        elements.statusMessage.textContent = message;
        elements.statusMessage.className = `status-${type}`;
        
        // Auto-clear after 3 seconds
        setTimeout(() => {
            if (elements.statusMessage.textContent === message) {
                elements.statusMessage.textContent = 'Ready';
                elements.statusMessage.className = '';
            }
        }, 3000);
    }

    // Create Modal Overlay
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
        return overlay;
    }

    // Create Modal Container
    function createModal(title, overlay) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        const header = document.createElement('div');
        header.className = 'modal-header';
        header.innerHTML = `
            <h2>${title}</h2>
            <button class="modal-close" aria-label="Close">×</button>
        `;
        
        header.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
        modal.appendChild(header);
        
        return modal;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
