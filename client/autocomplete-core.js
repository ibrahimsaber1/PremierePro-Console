// client/autocomplete-core.js
// Core autocomplete functionality for ExtendScript

class ExtendScriptAutocomplete {
    constructor(textarea) {
        this.textarea = textarea;
        this.dropdown = null;
        this.currentSuggestions = [];
        this.selectedIndex = 0;
        this.isVisible = false;
        this.debounceTimer = null;
        this.cache = new Map();
        
        this.init();
    }
    
    init() {
        this.createDropdown();
        this.setupEventHandlers();
        this.loadAPI();
    }
    
    loadAPI() {
        // API data is loaded from extendscript-api.js
        this.apiData = window.EXTENDSCRIPT_API || {};
        this.constants = window.EXTENDSCRIPT_CONSTANTS || {};
    }
    
    createDropdown() {
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'autocomplete-dropdown';
        this.dropdown.style.cssText = `
            position: fixed;
            z-index: 10000;
            background: #2D2D2D;
            border: 1px solid #555;
            border-radius: 4px;
            max-height: 200px;
            overflow-y: auto;
            min-width: 200px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: none;
        `;
        document.body.appendChild(this.dropdown);
    }
    
    setupEventHandlers() {
        this.textarea.addEventListener('input', (e) => {
            this.handleInput(e);
        });
        
        this.textarea.addEventListener('keydown', (e) => {
            this.handleKeyDown(e);
        });
        
        this.textarea.addEventListener('blur', (e) => {
            // Delay hiding to allow click events on dropdown
            setTimeout(() => this.hideDropdown(), 150);
        });
        
        // Handle clicks outside the dropdown
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target) && e.target !== this.textarea) {
                this.hideDropdown();
            }
        });
    }
    
    handleInput(e) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.processInput();
        }, 150);
    }
    
    processInput() {
        const context = this.analyzeContext();
        
        if (!context || (context.type === 'identifier' && context.word.length < 2)) {
            this.hideDropdown();
            return;
        }
        
        const suggestions = this.getSuggestions(context);
        
        if (suggestions.length > 0) {
            this.showSuggestions(suggestions);
        } else {
            this.hideDropdown();
        }
    }
    
    analyzeContext() {
        const cursorPos = this.textarea.selectionStart;
        const text = this.textarea.value;
        const beforeCursor = text.substring(Math.max(0, cursorPos - 200), cursorPos);
        
        // Match object property access like "app.project.activeSequence.mar"
        const objectChainRegex = /([a-zA-Z$_][a-zA-Z0-9$_]*(?:\.[a-zA-Z$_][a-zA-Z0-9$_]*)*)\.([a-zA-Z$_][a-zA-Z0-9$_]*)$/;
        const objectMatch = beforeCursor.match(objectChainRegex);
        
        if (objectMatch) {
            const fullPath = objectMatch[1];
            const partialProperty = objectMatch[2];
            const pathParts = fullPath.split('.');
            
            return {
                type: 'property_access',
                objectPath: pathParts,
                partialProperty: partialProperty,
                replaceLength: partialProperty.length
            };
        }
        
        // Match method calls for parameter hints
        const methodCallRegex = /([a-zA-Z$_][a-zA-Z0-9$_]*)\s*\(\s*([^)]*)$/;
        const methodMatch = beforeCursor.match(methodCallRegex);
        
        if (methodMatch) {
            return {
                type: 'method_call',
                methodName: methodMatch[1],
                parameters: methodMatch[2]
            };
        }
        
        // Match standalone identifiers
        const identifierRegex = /[a-zA-Z$_][a-zA-Z0-9$_]*$/;
        const identifierMatch = beforeCursor.match(identifierRegex);
        
        if (identifierMatch) {
            return {
                type: 'identifier',
                word: identifierMatch[0],
                replaceLength: identifierMatch[0].length
            };
        }
        
        return null;
    }
    
    getSuggestions(context) {
        const cacheKey = JSON.stringify(context);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        let suggestions = [];
        
        switch (context.type) {
            case 'property_access':
                suggestions = this.getObjectSuggestions(context.objectPath, context.partialProperty);
                break;
            case 'identifier':
                suggestions = this.getGlobalSuggestions(context.word);
                break;
            case 'method_call':
                suggestions = this.getMethodSuggestions(context.methodName);
                break;
        }
        
        // Cache the results
        this.cache.set(cacheKey, suggestions);
        
        return suggestions;
    }
    
    getObjectSuggestions(objectPath, partial) {
        let currentObject = this.apiData;
        
        // Navigate through the object path
        for (let i = 0; i < objectPath.length; i++) {
            const segment = objectPath[i];
            
            if (currentObject.properties && currentObject.properties[segment]) {
                const property = currentObject.properties[segment];
                if (property.type && this.apiData[property.type]) {
                    currentObject = this.apiData[property.type];
                } else {
                    // Look for the type in the API structure
                    currentObject = this.findObjectByType(property.type) || currentObject;
                }
            } else if (currentObject[segment]) {
                currentObject = currentObject[segment];
            } else {
                return [];
            }
        }
        
        const suggestions = [];
        
        // Add properties
        if (currentObject.properties) {
            Object.keys(currentObject.properties).forEach(key => {
                if (key.toLowerCase().startsWith(partial.toLowerCase())) {
                    const prop = currentObject.properties[key];
                    suggestions.push({
                        name: key,
                        type: 'property',
                        returnType: prop.type || 'Unknown',
                        description: prop.description || '',
                        readonly: prop.readonly || false,
                        insertText: key
                    });
                }
            });
        }
        
        // Add methods
        if (currentObject.methods) {
            Object.keys(currentObject.methods).forEach(key => {
                if (key.toLowerCase().startsWith(partial.toLowerCase())) {
                    const method = currentObject.methods[key];
                    suggestions.push({
                        name: key,
                        type: 'method',
                        returnType: method.returnType || 'Unknown',
                        description: method.description || '',
                        signature: method.signature || `${key}()`,
                        parameters: method.parameters || [],
                        insertText: method.parameters && method.parameters.length > 0 ? `${key}()` : `${key}()`
                    });
                }
            });
        }
        
        return this.sortSuggestions(suggestions, partial);
    }
    
    getGlobalSuggestions(partial) {
        const suggestions = [];
        
        // Add top-level objects like 'app'
        Object.keys(this.apiData).forEach(key => {
            if (key.toLowerCase().startsWith(partial.toLowerCase())) {
                const obj = this.apiData[key];
                suggestions.push({
                    name: key,
                    type: 'object',
                    description: obj.description || `${key} object`,
                    insertText: key
                });
            }
        });
        
        // Add constants
        Object.keys(this.constants).forEach(constantGroup => {
            if (constantGroup.toLowerCase().startsWith(partial.toLowerCase())) {
                suggestions.push({
                    name: constantGroup,
                    type: 'constant',
                    description: `${constantGroup} constants`,
                    insertText: constantGroup
                });
            }
        });
        
        return this.sortSuggestions(suggestions, partial);
    }
    
    getMethodSuggestions(methodName) {
        // This could be expanded to show parameter hints
        return [];
    }
    
    findObjectByType(typeName) {
        // Simple type lookup - could be more sophisticated
        for (const key in this.apiData) {
            if (key === typeName || (this.apiData[key].type === typeName)) {
                return this.apiData[key];
            }
        }
        return null;
    }
    
    sortSuggestions(suggestions, partial) {
        return suggestions.sort((a, b) => {
            // Exact matches first
            if (a.name === partial) return -1;
            if (b.name === partial) return 1;
            
            // Prefix matches next
            const aStartsWith = a.name.toLowerCase().startsWith(partial.toLowerCase());
            const bStartsWith = b.name.toLowerCase().startsWith(partial.toLowerCase());
            
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            
            // Then alphabetical
            return a.name.localeCompare(b.name);
        });
    }
    
    showSuggestions(suggestions) {
        this.currentSuggestions = suggestions.slice(0, 10); // Limit to 10 items
        this.selectedIndex = 0;
        this.updateDropdownContent();
        this.positionDropdown();
        this.showDropdown();
    }
    
    updateDropdownContent() {
        this.dropdown.innerHTML = '';
        
        this.currentSuggestions.forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.className = `autocomplete-item ${index === this.selectedIndex ? 'selected' : ''}`;
            
            const icon = this.getIcon(suggestion.type);
            const typeColor = this.getTypeColor(suggestion.type);
            
            item.innerHTML = `
                <div class="autocomplete-item-content">
                    <span class="autocomplete-icon">${icon}</span>
                    <span class="autocomplete-name">${suggestion.name}</span>
                    <span class="autocomplete-type" style="color: ${typeColor}">${suggestion.returnType || suggestion.type}</span>
                </div>
                ${suggestion.description ? `<div class="autocomplete-description">${suggestion.description}</div>` : ''}
            `;
            
            item.addEventListener('click', () => {
                this.acceptSuggestion(suggestion);
            });
            
            this.dropdown.appendChild(item);
        });
    }
    
    getIcon(type) {
        const icons = {
            property: '🔧',
            method: '⚡',
            object: '📦',
            constant: '🔢'
        };
        return icons[type] || '•';
    }
    
    getTypeColor(type) {
        const colors = {
            property: '#98C379',
            method: '#61DAFB',
            object: '#E06C75',
            constant: '#D19A66'
        };
        return colors[type] || '#ABB2BF';
    }
    
    positionDropdown() {
        const coords = this.getCursorCoordinates();
        const rect = this.textarea.getBoundingClientRect();
        
        this.dropdown.style.left = `${rect.left + coords.x}px`;
        this.dropdown.style.top = `${rect.top + coords.y + 20}px`;
        
        // Ensure dropdown stays in viewport
        const dropdownRect = this.dropdown.getBoundingClientRect();
        if (dropdownRect.right > window.innerWidth) {
            this.dropdown.style.left = `${window.innerWidth - dropdownRect.width - 10}px`;
        }
        if (dropdownRect.bottom > window.innerHeight) {
            this.dropdown.style.top = `${rect.top + coords.y - dropdownRect.height - 5}px`;
        }
    }
    
    getCursorCoordinates() {
        // Create a mirror element to calculate cursor position
        const mirror = document.createElement('div');
        const computedStyle = window.getComputedStyle(this.textarea);
        
        // Copy styles
        ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'padding', 'border'].forEach(prop => {
            mirror.style[prop] = computedStyle[prop];
        });
        
        mirror.style.position = 'absolute';
        mirror.style.visibility = 'hidden';
        mirror.style.whiteSpace = 'pre-wrap';
        mirror.style.wordWrap = 'break-word';
        mirror.style.width = this.textarea.offsetWidth + 'px';
        
        const cursorPos = this.textarea.selectionStart;
        const textBeforeCursor = this.textarea.value.substring(0, cursorPos);
        
        mirror.textContent = textBeforeCursor;
        const span = document.createElement('span');
        span.innerHTML = '&nbsp;';
        mirror.appendChild(span);
        
        document.body.appendChild(mirror);
        
        const spanRect = span.getBoundingClientRect();
        const mirrorRect = mirror.getBoundingClientRect();
        
        document.body.removeChild(mirror);
        
        return {
            x: spanRect.left - mirrorRect.left,
            y: spanRect.top - mirrorRect.top
        };
    }
    
    showDropdown() {
        this.dropdown.style.display = 'block';
        this.isVisible = true;
    }
    
    hideDropdown() {
        this.dropdown.style.display = 'none';
        this.isVisible = false;
        this.selectedIndex = 0;
    }
    
    handleKeyDown(e) {
        if (!this.isVisible) return;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.currentSuggestions.length - 1);
                this.updateSelection();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.updateSelection();
                break;
                
            case 'Enter':
            case 'Tab':
                if (this.currentSuggestions[this.selectedIndex]) {
                    e.preventDefault();
                    this.acceptSuggestion(this.currentSuggestions[this.selectedIndex]);
                }
                break;
                
            case 'Escape':
                this.hideDropdown();
                break;
        }
    }
    
    updateSelection() {
        const items = this.dropdown.querySelectorAll('.autocomplete-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }
    
    acceptSuggestion(suggestion) {
        const context = this.analyzeContext();
        const replaceLength = context ? (context.replaceLength || 0) : 0;
        
        const start = this.textarea.selectionStart - replaceLength;
        const end = this.textarea.selectionEnd;
        
        this.textarea.setRangeText(suggestion.insertText, start, end, 'end');
        this.textarea.dispatchEvent(new Event('input', { bubbles: true }));
        this.textarea.focus();
        this.hideDropdown();
    }
}

// CSS styles for autocomplete dropdown
const autocompleteStyles = `
.autocomplete-dropdown {
    font-family: monospace;
    font-size: 12px;
    color: #E0E0E0;
}

.autocomplete-item {
    padding: 6px 10px;
    cursor: pointer;
    border-bottom: 1px solid #444;
}

.autocomplete-item:hover,
.autocomplete-item.selected {
    background-color: #404040;
}

.autocomplete-item-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.autocomplete-icon {
    font-size: 14px;
    width: 16px;
}

.autocomplete-name {
    flex: 1;
    font-weight: bold;
}

.autocomplete-type {
    font-size: 10px;
    opacity: 0.7;
}

.autocomplete-description {
    font-size: 10px;
    color: #999;
    margin-top: 2px;
    padding-left: 24px;
    line-height: 1.2;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
`;

// Add styles to document
if (!document.getElementById('autocomplete-styles')) {
    const style = document.createElement('style');
    style.id = 'autocomplete-styles';
    style.textContent = autocompleteStyles;
    document.head.appendChild(style);
}