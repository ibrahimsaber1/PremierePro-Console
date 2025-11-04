// Premiere Pro Console - Main Application Logic

window.csInterface = new CSInterface();

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

    // Make openExternalLink globally available - FIX FOR THE ERROR
    window.openExternalLink = function(url) {
        try {
            if (csInterface && typeof csInterface.openURLInDefaultBrowser === 'function') {
                csInterface.openURLInDefaultBrowser(url);
            } else if (window.cep && window.cep.util) {
                window.cep.util.openURLInDefaultBrowser(url);
            } else {
                window.open(url, '_blank');
            }
        } catch (e) {
            console.error('Error opening link:', e);
            alert('Could not open link: ' + url);
        }
    };

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

function showHelpPanel() {
    const overlay = createOverlay();
    const modal = createModal('', overlay); // Empty title, we'll add custom header
    modal.style.maxWidth = '900px';
    modal.style.maxHeight = '90vh';
    
    // Get current language from localStorage or default to English
    let currentLang = localStorage.getItem('ppro_console_language') || 'en';
    
    // Function to render help content
    function renderHelpContent(lang) {
        const t = TRANSLATIONS[lang].help;
        
        modal.innerHTML = `
            <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #444; background: #3D3D3D;">
                <h2 style="margin: 0; color: #61DAFB; font-size: 18px;">${t.title}</h2>
                <div style="display: flex; gap: 12px; align-items: center;">
                    <select id="language-selector" style="background: #2D2D2D; color: #E0E0E0; border: 1px solid #555; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        ${Object.keys(TRANSLATIONS).map(code => `
                            <option value="${code}" ${code === lang ? 'selected' : ''}>
                                ${TRANSLATIONS[code].flag} ${TRANSLATIONS[code].name}
                            </option>
                        `).join('')}
                    </select>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; color: #E0E0E0; font-size: 28px; cursor: pointer; padding: 0; width: 32px; height: 32px;">×</button>
                </div>
            </div>
            
            <div class="help-content" style="padding: 24px; overflow-y: auto; max-height: calc(90vh - 80px);">
                <div style="text-align: center; margin-bottom: 32px;">
                    <h1 style="color: #61DAFB; font-size: 28px; margin: 0 0 12px 0;">${t.welcome}</h1>
                    <p style="color: #AAA; font-size: 14px; line-height: 1.6; max-width: 600px; margin: 0 auto;">${t.description}</p>
                </div>
                
                <!-- Getting Started -->
                <section style="margin-bottom: 32px;">
                    <h2 style="color: #98C379; margin-bottom: 16px; font-size: 20px; border-bottom: 2px solid #98C379; padding-bottom: 8px;">
                        🚀 ${t.sections.gettingStarted}
                    </h2>
                    <p style="color: #CCC; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">${t.gettingStarted.intro}</p>
                    <ol style="color: #BBB; font-size: 13px; line-height: 1.8; padding-left: 20px;">
                        ${t.gettingStarted.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </section>
                
                <!-- Shortcuts -->
                <section style="margin-bottom: 32px;">
                    <h2 style="color: #61DAFB; margin-bottom: 16px; font-size: 20px; border-bottom: 2px solid #61DAFB; padding-bottom: 8px;">
                        ⌨️ ${t.sections.shortcuts}
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px;">
                        ${t.shortcuts.map(s => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: #252525; border-radius: 6px; border-left: 3px solid #61DAFB;">
                                <kbd style="background: #1E1E1E; padding: 4px 8px; border-radius: 4px; font-size: 11px; color: #D19A66; font-family: monospace;">${s.keys}</kbd>
                                <span style="color: #AAA; font-size: 12px;">${s.desc}</span>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <!-- Features -->
                <section style="margin-bottom: 32px;">
                    <h2 style="color: #C678DD; margin-bottom: 16px; font-size: 20px; border-bottom: 2px solid #C678DD; padding-bottom: 8px;">
                        ✨ ${t.sections.features}
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 16px;">
                        ${t.features.map(f => `
                            <div style="padding: 16px; background: #252525; border-radius: 8px; border-left: 4px solid #C678DD;">
                                <h3 style="color: #E0E0E0; font-size: 15px; margin: 0 0 8px 0;">${f.title}</h3>
                                <p style="color: #999; font-size: 12px; line-height: 1.6; margin: 0;">${f.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
                
                <!-- Code Examples -->
                <section style="margin-bottom: 32px;">
                    <h2 style="color: #D19A66; margin-bottom: 16px; font-size: 20px; border-bottom: 2px solid #D19A66; padding-bottom: 8px;">
                        💡 ${t.sections.codeExamples}
                    </h2>
                    ${t.examples.map(ex => `
                        <div style="margin-bottom: 20px;">
                            <h3 style="color: #E0E0E0; font-size: 14px; margin: 0 0 8px 0;">${ex.title}</h3>
                            <pre style="background: #1E1E1E; padding: 14px; border-radius: 6px; border-left: 4px solid #D19A66; overflow-x: auto;"><code style="color: #98C379; font-size: 11px; font-family: 'Consolas', 'Monaco', monospace; line-height: 1.6;">${ex.code}</code></pre>
                        </div>
                    `).join('')}
                </section>
                
                <!-- Tips -->
                <section style="margin-bottom: 32px;">
                    <h2 style="color: #E06C75; margin-bottom: 16px; font-size: 20px; border-bottom: 2px solid #E06C75; padding-bottom: 8px;">
                        💡 ${t.sections.tips}
                    </h2>
                    <ul style="color: #BBB; font-size: 13px; line-height: 1.8; padding-left: 20px;">
                        ${t.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </section>
                
                <!-- Resources -->
                <section style="margin-bottom: 16px;">
                    <h2 style="color: #98C379; margin-bottom: 16px; font-size: 20px; border-bottom: 2px solid #98C379; padding-bottom: 8px;">
                        📚 ${t.sections.resources}
                    </h2>
                    
                    <!-- Author Credit -->
                    <div style="padding: 16px; background: #252525; border-radius: 8px; border-left: 4px solid #61DAFB; margin-bottom: 12px;">
                        <p style="color: #61DAFB; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                            👨‍💻 ${t.links.author}
                        </p>
                        <a href="#" onclick="window.openExternalLink('https://github.com/ibrahimsaber1'); return false;" style="color: #98C379; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                            🔗 github.com/ibrahimsaber1
                        </a>
                    </div>
                    
                    <!-- GitHub Repository -->
                    <div style="padding: 16px; background: #252525; border-radius: 8px; border-left: 4px solid #C678DD; margin-bottom: 12px;">
                        <p style="color: #E0E0E0; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                            🌟 ${t.links.githubRepo}
                        </p>
                        <a href="#" onclick="window.openExternalLink('https://github.com/ibrahimsaber1/PremierePro-Console'); return false;" style="color: #61DAFB; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                            🔗 github.com/ibrahimsaber1/PremierePro-Console
                            <span style="color: #999; font-size: 11px;">(${t.links.contribute})</span>
                        </a>
                    </div>
                    
                    <!-- Official Docs -->
                    <div style="padding: 16px; background: #252525; border-radius: 8px; border-left: 4px solid #98C379;">
                        <p style="color: #E0E0E0; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                            ${t.links.officialDocs}
                        </p>
                        <a href="#" onclick="window.openExternalLink('https://ppro-scripting.docsforadobe.dev/'); return false;" style="color: #61DAFB; text-decoration: none; font-size: 13px; display: inline-flex; align-items: center; gap: 6px;">
                            🔗 ppro-scripting.docsforadobe.dev
                            <span style="color: #999; font-size: 11px;">(${t.links.openLink})</span>
                        </a>
                    </div>
                </section>
            </div>
        `;
        
        // Add language selector event listener
        const langSelector = modal.querySelector('#language-selector');
        if (langSelector) {
            langSelector.addEventListener('change', (e) => {
                currentLang = e.target.value;
                localStorage.setItem('ppro_console_language', currentLang);
                renderHelpContent(currentLang);
            });
        }
    }
    
    // Initial render
    renderHelpContent(currentLang);
    
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
