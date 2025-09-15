// client/autocomplete-core.js - Enhanced with comprehensive API data
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
    
    // Debug function to help troubleshoot autocomplete issues
    debugAutocomplete(objectPath) {
        console.log('Debug autocomplete for path:', objectPath);
        let currentObject = this.apiData;
        
        for (let i = 0; i < objectPath.length; i++) {
            const segment = objectPath[i];
            console.log(`Segment ${i}: ${segment}`);
            console.log('Current object:', currentObject);
            
            if (segment === 'app' && i === 0) {
                currentObject = this.apiData.app;
                console.log('Found app object:', currentObject);
                continue;
            }
            
            if (currentObject && currentObject.properties && currentObject.properties[segment]) {
                const property = currentObject.properties[segment];
                console.log('Found property:', property);
                
                if (property.type && this.apiData[property.type]) {
                    currentObject = this.apiData[property.type];
                    console.log('Following type reference to:', property.type, currentObject);
                } else {
                    console.log('No type reference found for:', property.type);
                    return null;
                }
            } else {
                console.log('Property not found:', segment);
                return null;
            }
        }
        
        console.log('Final object:', currentObject);
        return currentObject;
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
            max-height: 300px;
            overflow-y: auto;
            min-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: none;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 12px;
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
        }, 100);
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
        const beforeCursor = text.substring(Math.max(0, cursorPos - 300), cursorPos);
        
        // Match object property access like "app.project.activeSequence.markers.getFirstMarker"
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
        
        // Match method calls for parameter hints (e.g., "setInPoint(" or "createMarker(")
        const methodCallRegex = /([a-zA-Z$_][a-zA-Z0-9$_]*)\s*\(\s*([^)]*)$/;
        const methodMatch = beforeCursor.match(methodCallRegex);
        
        if (methodMatch) {
            return {
                type: 'method_call',
                methodName: methodMatch[1],
                parameters: methodMatch[2],
                replaceLength: 0
            };
        }
        
        // Match array access like "app.project.sequences[0]."
        const arrayAccessRegex = /([a-zA-Z$_][a-zA-Z0-9$_]*(?:\.[a-zA-Z$_][a-zA-Z0-9$_]*)*)\[([^\]]*)\]\.([a-zA-Z$_][a-zA-Z0-9$_]*)$/;
        const arrayMatch = beforeCursor.match(arrayAccessRegex);
        
        if (arrayMatch) {
            const objectPath = arrayMatch[1];
            const partialProperty = arrayMatch[3];
            const pathParts = objectPath.split('.');
            
            return {
                type: 'array_access',
                objectPath: pathParts,
                partialProperty: partialProperty,
                replaceLength: partialProperty.length
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
            case 'array_access':
                suggestions = this.getObjectSuggestions(context.objectPath, context.partialProperty);
                break;
            case 'identifier':
                suggestions = this.getGlobalSuggestions(context.word);
                break;
            case 'method_call':
                suggestions = this.getMethodParameterHints(context.methodName, context.parameters);
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
            
            if (currentObject && currentObject.properties && currentObject.properties[segment]) {
                const property = currentObject.properties[segment];
                if (property.type && this.apiData[property.type]) {
                    currentObject = this.apiData[property.type];
                } else {
                    // Look for the type in the API structure
                    currentObject = this.findObjectByType(property.type) || currentObject;
                }
            } else if (currentObject && currentObject[segment]) {
                currentObject = currentObject[segment];
            } else {
                // Handle collection types (like sequences[0] -> Sequence)
                if (segment.includes('Collection') || segment.includes('Tracks') || segment.includes('Items')) {
                    const elementType = this.getCollectionElementType(segment);
                    if (elementType && this.apiData[elementType]) {
                        currentObject = this.apiData[elementType];
                        continue;
                    }
                }
                return [];
            }
        }
        
        if (!currentObject) return [];
        
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
                        insertText: key,
                        detail: this.formatPropertyDetail(prop)
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
                        insertText: this.formatMethodInsert(key, method.parameters),
                        detail: this.formatMethodDetail(method)
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
                    insertText: key,
                    detail: obj.description || ''
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
                    insertText: constantGroup,
                    detail: `Constants: ${Object.keys(this.constants[constantGroup]).join(', ')}`
                });
            }
            
            // Add individual constant values
            Object.keys(this.constants[constantGroup]).forEach(constantName => {
                if (constantName.toLowerCase().startsWith(partial.toLowerCase())) {
                    suggestions.push({
                        name: constantName,
                        type: 'constant',
                        description: `${constantGroup}.${constantName}`,
                        insertText: `${constantGroup}.${constantName}`,
                        detail: `Value: ${this.constants[constantGroup][constantName]}`
                    });
                }
            });
        });
        
        // Add common JavaScript keywords and functions
        const jsKeywords = ['var', 'function', 'if', 'else', 'for', 'while', 'try', 'catch', 'return', 'new', 'this'];
        jsKeywords.forEach(keyword => {
            if (keyword.toLowerCase().startsWith(partial.toLowerCase())) {
                suggestions.push({
                    name: keyword,
                    type: 'keyword',
                    description: `JavaScript keyword: ${keyword}`,
                    insertText: keyword,
                    detail: 'JavaScript keyword'
                });
            }
        });
        
        return this.sortSuggestions(suggestions, partial);
    }
    
    getMethodParameterHints(methodName, currentParams) {
        // Find method definition in API
        const methodInfo = this.findMethodInAPI(methodName);
        if (!methodInfo || !methodInfo.parameters) {
            return [];
        }
        
        const paramCount = currentParams.split(',').length;
        const currentParam = methodInfo.parameters[paramCount - 1];
        
        if (!currentParam) return [];
        
        return [{
            name: `Parameter: ${currentParam.name}`,
            type: 'hint',
            description: currentParam.description || '',
            detail: `Type: ${currentParam.type}`,
            insertText: '',
            isParameterHint: true
        }];
    }
    
    findMethodInAPI(methodName) {
        // Recursively search for method in API structure
        const search = (obj) => {
            if (obj.methods && obj.methods[methodName]) {
                return obj.methods[methodName];
            }
            if (obj.properties) {
                for (const prop of Object.values(obj.properties)) {
                    if (prop.type && this.apiData[prop.type]) {
                        const result = search(this.apiData[prop.type]);
                        if (result) return result;
                    }
                }
            }
            return null;
        };
        
        return search(this.apiData);
    }
    
    getCollectionElementType(collectionName) {
        const typeMap = {
            'sequences': 'Sequence',
            'videoTracks': 'Track',
            'audioTracks': 'Track',
            'clips': 'TrackItem',
            'children': 'ProjectItem',
            'markers': 'Marker',
            'projects': 'Project',
            'components': 'Component',
            'properties': 'ComponentParam'
        };
        
        for (const [key, type] of Object.entries(typeMap)) {
            if (collectionName.toLowerCase().includes(key.toLowerCase())) {
                return type;
            }
        }
        
        return null;
    }
    
    formatPropertyDetail(prop) {
        let detail = '';
        if (prop.type) detail += `Type: ${prop.type}`;
        if (prop.readonly) detail += ' (read-only)';
        return detail;
    }
    
    formatMethodDetail(method) {
        let detail = '';
        if (method.returnType) detail += `Returns: ${method.returnType}`;
        if (method.parameters && method.parameters.length > 0) {
            detail += `\nParameters: ${method.parameters.length}`;
        }
        return detail;
    }
    
    formatMethodInsert(methodName, parameters) {
        if (!parameters || parameters.length === 0) {
            return `${methodName}()`;
        }
        
        // Create parameter placeholders
        const paramPlaceholders = parameters.map((param, index) => {
            return `${param.name}`;
        }).join(', ');
        
        return `${methodName}(${paramPlaceholders})`;
    }
    
    findObjectByType(typeName) {
        // Simple type lookup
        if (this.apiData[typeName]) {
            return this.apiData[typeName];
        }
        
        // Search through the API for matching types
        for (const key in this.apiData) {
            const obj = this.apiData[key];
            if (obj.type === typeName) {
                return obj;
            }
        }
        
        return null;
    }
    
    sortSuggestions(suggestions, partial) {
        return suggestions.sort((a, b) => {
            // Exact matches first
            if (a.name === partial) return -1;
            if (b.name === partial) return 1;
            
            // Methods before properties
            if (a.type === 'method' && b.type === 'property') return -1;
            if (a.type === 'property' && b.type === 'method') return 1;
            
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
        this.currentSuggestions = suggestions.slice(0, 12); // Limit to 12 items
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
            
            // Special handling for parameter hints
            if (suggestion.isParameterHint) {
                item.innerHTML = `
                    <div class="autocomplete-parameter-hint">
                        <div class="parameter-name">${suggestion.name}</div>
                        <div class="parameter-detail">${suggestion.detail}</div>
                        <div class="parameter-description">${suggestion.description}</div>
                    </div>
                `;
            } else {
                item.innerHTML = `
                    <div class="autocomplete-item-content">
                        <span class="autocomplete-icon" style="color: ${typeColor}">${icon}</span>
                        <div class="autocomplete-main">
                            <div class="autocomplete-header">
                                <span class="autocomplete-name">${suggestion.name}</span>
                                <span class="autocomplete-type" style="color: ${typeColor}">${suggestion.returnType || suggestion.type}</span>
                            </div>
                            ${suggestion.signature ? `<div class="autocomplete-signature">${suggestion.signature}</div>` : ''}
                            ${suggestion.description ? `<div class="autocomplete-description">${suggestion.description}</div>` : ''}
                            ${suggestion.detail ? `<div class="autocomplete-detail">${suggestion.detail}</div>` : ''}
                        </div>
                    </div>
                `;
            }
            
            item.addEventListener('click', () => {
                if (!suggestion.isParameterHint) {
                    this.acceptSuggestion(suggestion);
                }
            });
            
            this.dropdown.appendChild(item);
        });
    }
    
    getIcon(type) {
        const icons = {
            property: '🔧',
            method: '⚡',
            object: '📦',
            constant: '🔢',
            keyword: '🔤',
            hint: '💡'
        };
        return icons[type] || '•';
    }
    
    getTypeColor(type) {
        const colors = {
            property: '#98C379',
            method: '#61DAFB',
            object: '#E06C75',
            constant: '#D19A66',
            keyword: '#C678DD',
            hint: '#F7DC6F'
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
        
        // Update status
        const statusElement = document.getElementById('autocomplete-status');
        if (statusElement) {
            statusElement.textContent = `Autocomplete: ${this.currentSuggestions.length} suggestions`;
        }
    }
    
    hideDropdown() {
        this.dropdown.style.display = 'none';
        this.isVisible = false;
        this.selectedIndex = 0;
        
        // Update status
        const statusElement = document.getElementById('autocomplete-status');
        if (statusElement) {
            statusElement.textContent = 'Autocomplete: Ready';
        }
    }
    
    handleKeyDown(e) {
        if (!this.isVisible) {
            // Manual trigger with Ctrl+Space
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault();
                this.processInput();
                return;
            }
            return;
        }
        
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
                if (this.currentSuggestions[this.selectedIndex] && !this.currentSuggestions[this.selectedIndex].isParameterHint) {
                    e.preventDefault();
                    this.acceptSuggestion(this.currentSuggestions[this.selectedIndex]);
                }
                break;
                
            case 'Escape':
                e.preventDefault();
                this.hideDropdown();
                break;
        }
    }
    
    updateSelection() {
        const items = this.dropdown.querySelectorAll('.autocomplete-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
        
        // Scroll selected item into view
        const selectedItem = items[this.selectedIndex];
        if (selectedItem) {
            selectedItem.scrollIntoView({ block: 'nearest' });
        }
    }
    
    acceptSuggestion(suggestion) {
        const context = this.analyzeContext();
        const replaceLength = context ? (context.replaceLength || 0) : 0;
        
        const start = this.textarea.selectionStart - replaceLength;
        const end = this.textarea.selectionEnd;
        
        let insertText = suggestion.insertText;
        
        // For methods, position cursor inside parentheses if there are parameters
        if (suggestion.type === 'method' && suggestion.parameters && suggestion.parameters.length > 0) {
            insertText = `${suggestion.name}(`;
            this.textarea.setRangeText(insertText, start, end, 'end');
            
            // Position cursor inside parentheses
            const newPos = start + insertText.length;
            this.textarea.setSelectionRange(newPos, newPos);
        } else {
            this.textarea.setRangeText(insertText, start, end, 'end');
        }
        
        this.textarea.dispatchEvent(new Event('input', { bubbles: true }));
        this.textarea.focus();
        this.hideDropdown();
    }
}