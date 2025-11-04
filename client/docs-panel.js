// client/docs-panel.js - Interactive API Documentation Panel

class APIDocs {
    constructor() {
        this.apiData = window.EXTENDSCRIPT_API || {};
        this.constants = window.EXTENDSCRIPT_CONSTANTS || {};
    }

    show() {
        // Remove existing panel if any
        const existing = document.getElementById('docs-panel-overlay');
        if (existing) existing.remove();

        // Create overlay
        const overlay = this.createOverlay();
        const panel = this.createPanel();
        
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        
        // Focus search after render
        setTimeout(() => {
            const searchInput = document.getElementById('docs-search');
            if (searchInput) searchInput.focus();
        }, 100);
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'docs-panel-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s;
        `;
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
        
        return overlay;
    }

    createPanel() {
        const panel = document.createElement('div');
        panel.style.cssText = `
            background: #1E1E1E;
            border: 1px solid #555;
            border-radius: 8px;
            width: 90%;
            max-width: 1200px;
            height: 85vh;
            display: flex;
            flex-direction: column;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            animation: slideUp 0.3s;
        `;

        // Header
        const header = this.createHeader();
        panel.appendChild(header);

        // Main content area
        const content = document.createElement('div');
        content.style.cssText = `
            display: flex;
            flex: 1;
            overflow: hidden;
        `;

        // Sidebar (object list)
        const sidebar = this.createSidebar();
        content.appendChild(sidebar);

        // Detail view
        const detailView = document.createElement('div');
        detailView.id = 'docs-detail-view';
        detailView.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #2D2D2D;
        `;
        detailView.innerHTML = this.getWelcomeContent();
        content.appendChild(detailView);

        panel.appendChild(content);

        return panel;
    }

    createHeader() {
        const header = document.createElement('div');
        header.style.cssText = `
            padding: 16px 20px;
            border-bottom: 1px solid #444;
            background: #3D3D3D;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;

        const title = document.createElement('h2');
        title.textContent = '📚 ExtendScript API Documentation';
        title.style.cssText = `
            margin: 0;
            color: #61DAFB;
            font-size: 18px;
            font-weight: 600;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #E0E0E0;
            font-size: 32px;
            cursor: pointer;
            padding: 0;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
        `;
        closeBtn.onmouseover = () => closeBtn.style.color = '#61DAFB';
        closeBtn.onmouseout = () => closeBtn.style.color = '#E0E0E0';
        closeBtn.onclick = () => {
            const overlay = document.getElementById('docs-panel-overlay');
            if (overlay) overlay.remove();
        };

        header.appendChild(title);
        header.appendChild(closeBtn);

        return header;
    }

    createSidebar() {
        const sidebar = document.createElement('div');
        sidebar.style.cssText = `
            width: 300px;
            border-right: 1px solid #444;
            display: flex;
            flex-direction: column;
            background: #252525;
        `;

        // Search box
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            padding: 12px;
            border-bottom: 1px solid #444;
        `;

        const searchInput = document.createElement('input');
        searchInput.id = 'docs-search';
        searchInput.type = 'text';
        searchInput.placeholder = '🔍 Search API...';
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

        searchInput.addEventListener('input', (e) => {
            this.filterObjects(e.target.value);
        });

        searchContainer.appendChild(searchInput);
        sidebar.appendChild(searchContainer);

        // Object list
        const objectList = document.createElement('div');
        objectList.id = 'docs-object-list';
        objectList.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 8px 0;
        `;

        this.renderObjectList(objectList);
        sidebar.appendChild(objectList);

        return sidebar;
    }

    renderObjectList(container, filter = '') {
        container.innerHTML = '';
        const lowerFilter = filter.toLowerCase();

        // Group objects by category
        const categories = {
            'Core': ['app', 'Project', 'Sequence'],
            'Items': ['ProjectItem', 'TrackItem', 'Marker'],
            'Collections': ['ProjectItemCollection', 'SequenceCollection', 'TrackCollection', 'TrackItemCollection', 'MarkerCollection', 'ComponentCollection', 'ComponentParamCollection', 'ProjectCollection'],
            'Media': ['Track', 'Component', 'ComponentParam', 'Time'],
            'Utilities': ['Properties', 'Encoder', 'SourceMonitor', 'Production', 'Anywhere']
        };

        Object.keys(categories).forEach(categoryName => {
            const categoryObjects = categories[categoryName].filter(name => {
                if (!this.apiData[name]) return false;
                if (!filter) return true;
                return name.toLowerCase().includes(lowerFilter);
            });

            if (categoryObjects.length === 0) return;

            // Category header
            const categoryHeader = document.createElement('div');
            categoryHeader.textContent = categoryName;
            categoryHeader.style.cssText = `
                padding: 8px 16px;
                font-size: 11px;
                font-weight: 600;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                background: #2A2A2A;
                border-bottom: 1px solid #333;
            `;
            container.appendChild(categoryHeader);

            // Objects in category
            categoryObjects.forEach(name => {
                const item = this.createObjectListItem(name);
                container.appendChild(item);
            });
        });

        // Constants section
        if (!filter || 'constants'.includes(lowerFilter)) {
            const constHeader = document.createElement('div');
            constHeader.textContent = 'Constants';
            constHeader.style.cssText = `
                padding: 8px 16px;
                font-size: 11px;
                font-weight: 600;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                background: #2A2A2A;
                border-bottom: 1px solid #333;
                margin-top: 8px;
            `;
            container.appendChild(constHeader);

            Object.keys(this.constants).forEach(name => {
                if (filter && !name.toLowerCase().includes(lowerFilter)) return;
                const item = this.createConstantListItem(name);
                container.appendChild(item);
            });
        }
    }

    createObjectListItem(name) {
        const item = document.createElement('div');
        item.style.cssText = `
            padding: 10px 16px;
            cursor: pointer;
            border-bottom: 1px solid #2A2A2A;
            transition: background 0.15s;
            color: #E0E0E0;
            font-size: 13px;
        `;

        const obj = this.apiData[name];
        const icon = name === 'app' ? '🌐' : '📦';
        
        item.innerHTML = `
            <span style="margin-right: 8px;">${icon}</span>
            <span style="font-weight: 500;">${name}</span>
            <div style="font-size: 10px; color: #888; margin-top: 2px; margin-left: 24px;">${obj.description || ''}</div>
        `;

        item.addEventListener('mouseenter', () => {
            item.style.background = '#333';
        });
        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });
        item.addEventListener('click', () => {
            this.showObjectDetails(name);
        });

        return item;
    }

    createConstantListItem(name) {
        const item = document.createElement('div');
        item.style.cssText = `
            padding: 10px 16px;
            cursor: pointer;
            border-bottom: 1px solid #2A2A2A;
            transition: background 0.15s;
            color: #E0E0E0;
            font-size: 13px;
        `;

        item.innerHTML = `
            <span style="margin-right: 8px;">🔢</span>
            <span style="font-weight: 500;">${name}</span>
        `;

        item.addEventListener('mouseenter', () => {
            item.style.background = '#333';
        });
        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
        });
        item.addEventListener('click', () => {
            this.showConstantDetails(name);
        });

        return item;
    }

    showObjectDetails(name) {
        const detailView = document.getElementById('docs-detail-view');
        const obj = this.apiData[name];

        let html = `
            <h1 style="color: #61DAFB; margin-top: 0; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 32px;">${name === 'app' ? '🌐' : '📦'}</span>
                <span>${name}</span>
            </h1>
            <p style="color: #BBB; font-size: 14px; line-height: 1.6;">${obj.description || 'No description available.'}</p>
        `;

        // Properties section
        if (obj.properties && Object.keys(obj.properties).length > 0) {
            html += `
                <h2 style="color: #98C379; margin-top: 32px; margin-bottom: 16px; font-size: 18px; border-bottom: 2px solid #98C379; padding-bottom: 8px;">
                    📌 Properties
                </h2>
            `;

            Object.keys(obj.properties).forEach(propName => {
                const prop = obj.properties[propName];
                html += `
                    <div style="margin-bottom: 20px; padding: 12px; background: #252525; border-radius: 6px; border-left: 3px solid #98C379;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <code style="color: #E0E0E0; font-size: 14px; font-weight: 600;">${propName}</code>
                            <span style="background: rgba(152, 195, 121, 0.2); color: #98C379; padding: 2px 8px; border-radius: 3px; font-size: 11px;">${prop.type || 'Unknown'}</span>
                        </div>
                        <p style="color: #AAA; font-size: 12px; margin: 4px 0;">${prop.description || 'No description'}</p>
                        ${prop.readonly ? '<span style="color: #D19A66; font-size: 11px;">🔒 Read-only</span>' : ''}
                    </div>
                `;
            });
        }

        // Methods section
        if (obj.methods && Object.keys(obj.methods).length > 0) {
            html += `
                <h2 style="color: #61DAFB; margin-top: 32px; margin-bottom: 16px; font-size: 18px; border-bottom: 2px solid #61DAFB; padding-bottom: 8px;">
                    ⚡ Methods
                </h2>
            `;

            Object.keys(obj.methods).forEach(methodName => {
                const method = obj.methods[methodName];
                html += `
                    <div style="margin-bottom: 24px; padding: 14px; background: #252525; border-radius: 6px; border-left: 3px solid #61DAFB;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <code style="color: #61DAFB; font-size: 14px; font-weight: 600;">${methodName}()</code>
                            <span style="background: rgba(97, 218, 251, 0.2); color: #61DAFB; padding: 2px 8px; border-radius: 3px; font-size: 11px;">${method.returnType || 'void'}</span>
                        </div>
                        <p style="color: #AAA; font-size: 12px; margin: 8px 0;">${method.description || 'No description'}</p>
                        ${method.signature ? `<code style="display: block; background: #1E1E1E; padding: 8px; border-radius: 4px; color: #C678DD; font-size: 11px; margin-top: 8px;">${method.signature}</code>` : ''}
                        ${method.parameters && method.parameters.length > 0 ? `
                            <div style="margin-top: 12px;">
                                <strong style="color: #D19A66; font-size: 11px;">Parameters:</strong>
                                <ul style="margin: 8px 0; padding-left: 20px;">
                                    ${method.parameters.map(p => `
                                        <li style="color: #999; font-size: 11px; margin: 4px 0;">
                                            <code style="color: #E06C75;">${p.name}</code>
                                            <span style="color: #666;"> : </span>
                                            <code style="color: #98C379;">${p.type}</code>
                                            ${p.description ? ` - ${p.description}` : ''}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        ` : ''}
                    </div>
                `;
            });
        }

        detailView.innerHTML = html;
        detailView.scrollTop = 0;
    }

    showConstantDetails(name) {
        const detailView = document.getElementById('docs-detail-view');
        const constants = this.constants[name];

        let html = `
            <h1 style="color: #D19A66; margin-top: 0; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 32px;">🔢</span>
                <span>${name}</span>
            </h1>
            <p style="color: #BBB; font-size: 14px; line-height: 1.6;">Constant values for ${name}</p>
            
            <h2 style="color: #D19A66; margin-top: 32px; margin-bottom: 16px; font-size: 18px; border-bottom: 2px solid #D19A66; padding-bottom: 8px;">
                Values
            </h2>
        `;

        Object.keys(constants).forEach(key => {
            const value = constants[key];
            html += `
                <div style="margin-bottom: 12px; padding: 12px; background: #252525; border-radius: 6px; border-left: 3px solid #D19A66; display: flex; justify-content: space-between; align-items: center;">
                    <code style="color: #E0E0E0; font-size: 13px; font-weight: 600;">${key}</code>
                    <code style="background: #1E1E1E; padding: 4px 12px; border-radius: 4px; color: #D19A66; font-size: 12px;">${value}</code>
                </div>
            `;
        });

        detailView.innerHTML = html;
        detailView.scrollTop = 0;
    }

    filterObjects(query) {
        const objectList = document.getElementById('docs-object-list');
        this.renderObjectList(objectList, query);
    }

    getWelcomeContent() {
        return `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 64px; margin-bottom: 20px;">📚</div>
                <h1 style="color: #61DAFB; margin-bottom: 16px;">ExtendScript API Documentation</h1>
                <p style="color: #999; font-size: 14px; line-height: 1.6; max-width: 500px; margin: 0 auto;">
                    Browse the complete Premiere Pro ExtendScript API reference. 
                    Select an object or constant from the sidebar to view detailed documentation.
                </p>
                <div style="margin-top: 40px; padding: 20px; background: #252525; border-radius: 8px; max-width: 600px; margin-left: auto; margin-right: auto;">
                    <h3 style="color: #98C379; margin-top: 0;">Quick Start</h3>
                    <ul style="text-align: left; color: #AAA; font-size: 13px; line-height: 1.8;">
                        <li>Click on any object in the sidebar to see its properties and methods</li>
                        <li>Use the search box to quickly find specific APIs</li>
                        <li>Each method shows parameters, return types, and usage examples</li>
                        <li>Copy method signatures directly to your console</li>
                    </ul>
                </div>
            </div>
        `;
    }
}

// Make it globally available
window.APIDocs = APIDocs;
