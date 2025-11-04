// client/extendscript-api.js - COMPLETE Premiere Pro API
// Based on official Adobe Premiere Pro ExtendScript documentation

const EXTENDSCRIPT_API = {
    // ============================================
    // APPLICATION (app)
    // ============================================
    app: {
        type: 'Application',
        description: 'The global application object providing access to Premiere Pro',
        properties: {
            // Project Management
            project: {
                type: 'Project',
                description: 'The currently active project',
                readonly: true
            },
            projects: {
                type: 'ProjectCollection',
                description: 'Array of all open projects',
                readonly: true
            },
            production: {
                type: 'Production',
                description: 'The currently active Team Projects production',
                readonly: true
            },
            
            // Monitors
            sourceMonitor: {
                type: 'SourceMonitor',
                description: 'Source monitor interface',
                readonly: true
            },
            
            // Encoder
            encoder: {
                type: 'Encoder',
                description: 'Adobe Media Encoder interface',
                readonly: true
            },
            
            // Properties
            properties: {
                type: 'Properties',
                description: 'Application properties interface',
                readonly: true
            },
            
            // Application Info
            version: {
                type: 'String',
                description: 'Version of Premiere Pro (e.g., "24.0.0")',
                readonly: true
            },
            build: {
                type: 'String',
                description: 'Build number of Premiere Pro',
                readonly: true
            },
            path: {
                type: 'String',
                description: 'Full path to Premiere Pro executable',
                readonly: true
            },
            userGuid: {
                type: 'String',
                description: 'Unique identifier for current Creative Cloud user',
                readonly: true
            },
            
            // Anywhere
            anywhere: {
                type: 'Anywhere',
                description: 'Premiere Pro Anywhere functionality',
                readonly: true
            }
        },
        methods: {
            // Application Control
            quit: {
                returnType: 'void',
                description: 'Quits Premiere Pro (prompts to save)',
                signature: 'quit()',
                parameters: []
            },
            
            // QE DOM
            enableQE: {
                returnType: 'Boolean',
                description: 'Enables Premiere Pro QE (Quality Engineering) DOM',
                signature: 'enableQE()',
                parameters: []
            },
            
            // Proxy Management
            getEnableProxies: {
                returnType: 'Number',
                description: 'Returns 1 if proxies enabled, 0 if disabled',
                signature: 'getEnableProxies()',
                parameters: []
            },
            setEnableProxies: {
                returnType: 'Number',
                description: 'Enables or disables proxy workflow',
                signature: 'setEnableProxies(enabled)',
                parameters: [
                    { name: 'enabled', type: 'Integer', description: '1 to enable, 0 to disable' }
                ]
            },
            
            // Workspace Management
            getWorkspaces: {
                returnType: 'Array',
                description: 'Returns array of available workspace names',
                signature: 'getWorkspaces()',
                parameters: []
            },
            setWorkspace: {
                returnType: 'Boolean',
                description: 'Sets the active workspace by name',
                signature: 'setWorkspace(workspaceName)',
                parameters: [
                    { name: 'workspaceName', type: 'String', description: 'Name of workspace to activate' }
                ]
            },
            
            // Document Management
            isDocument: {
                returnType: 'Boolean',
                description: 'Checks if file is a valid Premiere Pro project',
                signature: 'isDocument(filePath)',
                parameters: [
                    { name: 'filePath', type: 'String', description: 'Full path to file' }
                ]
            },
            isDocumentOpen: {
                returnType: 'Boolean',
                description: 'Returns true if at least one project is open',
                signature: 'isDocumentOpen()',
                parameters: []
            },
            newProject: {
                returnType: 'Boolean',
                description: 'Creates new project at specified path',
                signature: 'newProject(path)',
                parameters: [
                    { name: 'path', type: 'String', description: 'Full path (no extension needed)' }
                ]
            },
            openDocument: {
                returnType: 'Boolean',
                description: 'Opens a Premiere Pro project file',
                signature: 'openDocument(path, suppressConversionDialog, bypassLocateFileDialog, bypassWarningDialog, doNotAddToMRUList)',
                parameters: [
                    { name: 'path', type: 'String', description: 'Full path to project file' },
                    { name: 'suppressConversionDialog', type: 'Boolean', description: 'Skip conversion dialog' },
                    { name: 'bypassLocateFileDialog', type: 'Boolean', description: 'Skip locate file dialog' },
                    { name: 'bypassWarningDialog', type: 'Boolean', description: 'Skip warning dialogs' },
                    { name: 'doNotAddToMRUList', type: 'Boolean', description: 'Don\'t add to recent files' }
                ]
            },
            openFCPXML: {
                returnType: 'Boolean',
                description: 'Imports FCP XML as new Premiere Pro project',
                signature: 'openFCPXML(fcpxmlPath, projectPath)',
                parameters: [
                    { name: 'fcpxmlPath', type: 'String', description: 'Path to FCP XML file' },
                    { name: 'projectPath', type: 'String', description: 'Path for new project' }
                ]
            },
            
            // Messaging
            setSDKEventMessage: {
                returnType: 'Boolean',
                description: 'Writes message to Premiere Pro Events panel',
                signature: 'setSDKEventMessage(message, decorator)',
                parameters: [
                    { name: 'message', type: 'String', description: 'Message text' },
                    { name: 'decorator', type: 'String', description: '"info", "warning", or "error"' }
                ]
            },
            trace: {
                returnType: 'Boolean',
                description: 'Writes to Premiere Pro debug console',
                signature: 'trace(message)',
                parameters: [
                    { name: 'message', type: 'String', description: 'Debug message' }
                ]
            },
            
            // System
            getAppPrefPath: {
                returnType: 'String',
                description: 'Returns path to application preferences folder',
                signature: 'getAppPrefPath()',
                parameters: []
            },
            getAppSystemPrefPath: {
                returnType: 'String',
                description: 'Returns path to system preferences folder',
                signature: 'getAppSystemPrefPath()',
                parameters: []
            }
        }
    },

    // ============================================
    // PROJECT
    // ============================================
    Project: {
        type: 'object',
        description: 'Represents a Premiere Pro project',
        properties: {
            name: {
                type: 'String',
                description: 'Name of the project',
                readonly: true
            },
            path: {
                type: 'String',
                description: 'Full file path of the project',
                readonly: true
            },
            documentID: {
                type: 'String',
                description: 'Unique identifier (format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)',
                readonly: true
            },
            activeSequence: {
                type: 'Sequence',
                description: 'Currently active sequence in the Timeline',
                readonly: false
            },
            rootItem: {
                type: 'ProjectItem',
                description: 'Root folder of project panel',
                readonly: true
            },
            sequences: {
                type: 'SequenceCollection',
                description: 'All sequences in the project',
                readonly: true
            },
            isCloudProject: {
                type: 'Boolean',
                description: 'Whether this is a cloud-based project',
                readonly: true
            },
            cloudProjectLocalID: {
                type: 'String',
                description: 'Local ID for cloud project',
                readonly: true
            },
            cloudProjectURL: {
                type: 'String',
                description: 'URL for cloud project',
                readonly: true
            }
        },
        methods: {
            // Save/Close
            save: {
                returnType: 'Number',
                description: 'Saves project at current path',
                signature: 'save()',
                parameters: []
            },
            saveAs: {
                returnType: 'Number',
                description: 'Saves project to new location',
                signature: 'saveAs(path)',
                parameters: [
                    { name: 'path', type: 'String', description: 'New file path' }
                ]
            },
            closeDocument: {
                returnType: 'Number',
                description: 'Closes the project',
                signature: 'closeDocument(saveFirst, promptIfDirty)',
                parameters: [
                    { name: 'saveFirst', type: 'Integer', description: '1=save before close' },
                    { name: 'promptIfDirty', type: 'Integer', description: '1=prompt if unsaved' }
                ]
            },
            
            // Import
            importFiles: {
                returnType: 'Boolean',
                description: 'Imports media files into project',
                signature: 'importFiles(filePaths, suppressUI, targetBin, importAsNumberedStills)',
                parameters: [
                    { name: 'filePaths', type: 'Array', description: 'Array of file paths' },
                    { name: 'suppressUI', type: 'Boolean', description: 'Suppress dialogs' },
                    { name: 'targetBin', type: 'ProjectItem', description: 'Destination bin' },
                    { name: 'importAsNumberedStills', type: 'Boolean', description: 'Treat as image sequence' }
                ]
            },
            importSequences: {
                returnType: 'Array',
                description: 'Imports sequences from another project',
                signature: 'importSequences(projectPath, sequenceIDs)',
                parameters: [
                    { name: 'projectPath', type: 'String', description: 'Path to source project' },
                    { name: 'sequenceIDs', type: 'Array', description: 'Array of sequence IDs to import' }
                ]
            },
            importAEComps: {
                returnType: 'Boolean',
                description: 'Imports After Effects compositions',
                signature: 'importAEComps(aepPath, compNames, targetBin)',
                parameters: [
                    { name: 'aepPath', type: 'String', description: 'Path to .aep file' },
                    { name: 'compNames', type: 'Array', description: 'Array of comp names' },
                    { name: 'targetBin', type: 'ProjectItem', description: 'Destination bin' }
                ]
            },
            
            // Sequences
            newSequence: {
                returnType: 'Sequence',
                description: 'Creates new sequence from preset',
                signature: 'newSequence(name, presetPath)',
                parameters: [
                    { name: 'name', type: 'String', description: 'Sequence name' },
                    { name: 'presetPath', type: 'String', description: 'Path to .sqpreset file' }
                ]
            },
            createNewSequence: {
                returnType: 'Sequence',
                description: 'Creates new sequence with ID',
                signature: 'createNewSequence(name, sequenceID)',
                parameters: [
                    { name: 'name', type: 'String', description: 'Sequence name' },
                    { name: 'sequenceID', type: 'String', description: 'Unique ID' }
                ]
            },
            deleteSequence: {
                returnType: 'Boolean',
                description: 'Deletes sequence from project',
                signature: 'deleteSequence(sequence)',
                parameters: [
                    { name: 'sequence', type: 'Sequence', description: 'Sequence to delete' }
                ]
            },
            openSequence: {
                returnType: 'Boolean',
                description: 'Opens sequence by ID',
                signature: 'openSequence(sequenceID)',
                parameters: [
                    { name: 'sequenceID', type: 'String', description: 'Sequence ID' }
                ]
            },
            
            // Export
            exportAAF: {
                returnType: 'Number',
                description: 'Exports sequence as AAF',
                signature: 'exportAAF(sequence, path, mixdownVideo, explodeToMono, sampleRate, bitsPerSample, embedAudio, audioFileFormat, trimSources, handleFrames)',
                parameters: [
                    { name: 'sequence', type: 'Sequence', description: 'Sequence to export' },
                    { name: 'path', type: 'String', description: 'Output path' },
                    { name: 'mixdownVideo', type: 'Integer', description: 'Mix down video (0/1)' },
                    { name: 'explodeToMono', type: 'Integer', description: 'Explode to mono (0/1)' },
                    { name: 'sampleRate', type: 'Integer', description: 'Audio sample rate' },
                    { name: 'bitsPerSample', type: 'Integer', description: 'Bits per sample' },
                    { name: 'embedAudio', type: 'Integer', description: 'Embed audio (0/1)' },
                    { name: 'audioFileFormat', type: 'Integer', description: 'Audio format' },
                    { name: 'trimSources', type: 'Integer', description: 'Trim sources (0/1)' },
                    { name: 'handleFrames', type: 'Integer', description: 'Handle frames' }
                ]
            },
            exportFinalCutProXML: {
                returnType: 'Number',
                description: 'Exports project as FCP XML',
                signature: 'exportFinalCutProXML(path, suppressUI)',
                parameters: [
                    { name: 'path', type: 'String', description: 'Output path' },
                    { name: 'suppressUI', type: 'Integer', description: '1=suppress dialogs' }
                ]
            },
            exportOMF: {
                returnType: 'Number',
                description: 'Exports sequence as OMF',
                signature: 'exportOMF(sequence, path, omfTitle, sampleRate, bitsPerSample, audioEncapsulated, audioFileFormat, trimAudioFiles, handleFrames, includePan)',
                parameters: [
                    { name: 'sequence', type: 'Sequence', description: 'Sequence to export' },
                    { name: 'path', type: 'String', description: 'Output path' },
                    { name: 'omfTitle', type: 'String', description: 'OMF title' },
                    { name: 'sampleRate', type: 'Integer', description: 'Sample rate' },
                    { name: 'bitsPerSample', type: 'Integer', description: 'Bits per sample' },
                    { name: 'audioEncapsulated', type: 'Integer', description: 'Encapsulated (0/1)' },
                    { name: 'audioFileFormat', type: 'Integer', description: 'Audio format' },
                    { name: 'trimAudioFiles', type: 'Integer', description: 'Trim audio (0/1)' },
                    { name: 'handleFrames', type: 'Integer', description: 'Handle frames' },
                    { name: 'includePan', type: 'Integer', description: 'Include pan (0/1)' }
                ]
            },
            
            // Project Management
            consolidateDuplicates: {
                returnType: 'Number',
                description: 'Consolidates duplicate footage items',
                signature: 'consolidateDuplicates()',
                parameters: []
            },
            addPropertyToProjectMetadataSchema: {
                returnType: 'Boolean',
                description: 'Adds custom metadata field to project',
                signature: 'addPropertyToProjectMetadataSchema(name, label, type)',
                parameters: [
                    { name: 'name', type: 'String', description: 'Internal property name' },
                    { name: 'label', type: 'String', description: 'Display label' },
                    { name: 'type', type: 'Integer', description: 'Data type' }
                ]
            },
            getInsertionBin: {
                returnType: 'ProjectItem',
                description: 'Gets currently selected bin for imports',
                signature: 'getInsertionBin()',
                parameters: []
            }
        }
    },

    // ============================================
    // SEQUENCE
    // ============================================
    Sequence: {
        type: 'object',
        description: 'Represents a timeline sequence',
        properties: {
            name: {
                type: 'String',
                description: 'Name of the sequence',
                readonly: false
            },
            sequenceID: {
                type: 'String',
                description: 'Unique identifier',
                readonly: true
            },
            id: {
                type: 'Integer',
                description: 'Ordinal sequence number',
                readonly: true
            },
            projectItem: {
                type: 'ProjectItem',
                description: 'Associated project item',
                readonly: true
            },
            
            // Tracks
            videoTracks: {
                type: 'TrackCollection',
                description: 'Collection of video tracks',
                readonly: true
            },
            audioTracks: {
                type: 'TrackCollection',
                description: 'Collection of audio tracks',
                readonly: true
            },
            
            // Markers
            markers: {
                type: 'MarkerCollection',
                description: 'Sequence markers',
                readonly: true
            },
            
            // Timing
            end: {
                type: 'String',
                description: 'End time in ticks',
                readonly: true
            },
            zeroPoint: {
                type: 'String',
                description: 'Starting time in ticks',
                readonly: true
            },
            timebase: {
                type: 'String',
                description: 'Ticks per frame (e.g., "254016000000" for 23.976fps)',
                readonly: true
            },
            
            // Frame Size
            frameSizeHorizontal: {
                type: 'Integer',
                description: 'Frame width in pixels',
                readonly: true
            },
            frameSizeVertical: {
                type: 'Integer',
                description: 'Frame height in pixels',
                readonly: true
            },
            
            // Settings
            audioDisplayFormat: {
                type: 'Integer',
                description: 'Audio display format',
                readonly: false
            },
            videoDisplayFormat: {
                type: 'Integer',
                description: 'Video display format',
                readonly: false
            }
        },
        methods: {
            // Sequence Management
            clone: {
                returnType: 'Boolean',
                description: 'Duplicates the sequence',
                signature: 'clone()',
                parameters: []
            },
            close: {
                returnType: 'Boolean',
                description: 'Closes the sequence',
                signature: 'close()',
                parameters: []
            },
            
            // Playback Position
            getPlayerPosition: {
                returnType: 'Time',
                description: 'Gets Current Time Indicator position',
                signature: 'getPlayerPosition()',
                parameters: []
            },
            setPlayerPosition: {
                returnType: 'Boolean',
                description: 'Sets Current Time Indicator position',
                signature: 'setPlayerPosition(ticks)',
                parameters: [
                    { name: 'ticks', type: 'String', description: 'Time in ticks' }
                ]
            },
            
            // In/Out Points
            getInPoint: {
                returnType: 'String',
                description: 'Gets in point in seconds',
                signature: 'getInPoint()',
                parameters: []
            },
            getOutPoint: {
                returnType: 'String',
                description: 'Gets out point in seconds',
                signature: 'getOutPoint()',
                parameters: []
            },
            setInPoint: {
                returnType: 'null',
                description: 'Sets in point',
                signature: 'setInPoint(seconds)',
                parameters: [
                    { name: 'seconds', type: 'Number', description: 'Time in seconds' }
                ]
            },
            setOutPoint: {
                returnType: 'null',
                description: 'Sets out point',
                signature: 'setOutPoint(seconds)',
                parameters: [
                    { name: 'seconds', type: 'Number', description: 'Time in seconds' }
                ]
            },
            
            // Work Area
            getInPointAsTime: {
                returnType: 'Time',
                description: 'Gets in point as Time object',
                signature: 'getInPointAsTime()',
                parameters: []
            },
            getOutPointAsTime: {
                returnType: 'Time',
                description: 'Gets out point as Time object',
                signature: 'getOutPointAsTime()',
                parameters: []
            },
            setWorkAreaInPoint: {
                returnType: 'Boolean',
                description: 'Sets work area in point',
                signature: 'setWorkAreaInPoint(ticks)',
                parameters: [
                    { name: 'ticks', type: 'String', description: 'Time in ticks' }
                ]
            },
            setWorkAreaOutPoint: {
                returnType: 'Boolean',
                description: 'Sets work area out point',
                signature: 'setWorkAreaOutPoint(ticks)',
                parameters: [
                    { name: 'ticks', type: 'String', description: 'Time in ticks' }
                ]
            },
            
            // Editing
            insertClip: {
                returnType: 'Boolean',
                description: 'Inserts clip (ripple)',
                signature: 'insertClip(projectItem, time, vidTrackOffset, audTrackOffset)',
                parameters: [
                    { name: 'projectItem', type: 'ProjectItem', description: 'Item to insert' },
                    { name: 'time', type: 'String', description: 'Time in seconds' },
                    { name: 'vidTrackOffset', type: 'Integer', description: 'Video track index' },
                    { name: 'audTrackOffset', type: 'Integer', description: 'Audio track index' }
                ]
            },
            overwriteClip: {
                returnType: 'Boolean',
                description: 'Overwrites clips at position',
                signature: 'overwriteClip(projectItem, time, vidTrackOffset, audTrackOffset)',
                parameters: [
                    { name: 'projectItem', type: 'ProjectItem', description: 'Item to insert' },
                    { name: 'time', type: 'String', description: 'Time in seconds' },
                    { name: 'vidTrackOffset', type: 'Integer', description: 'Video track index' },
                    { name: 'audTrackOffset', type: 'Integer', description: 'Audio track index' }
                ]
            },
            
            // Export
            exportAsMediaDirect: {
                returnType: 'Boolean',
                description: 'Exports sequence using preset',
                signature: 'exportAsMediaDirect(outputPath, presetPath, workAreaType)',
                parameters: [
                    { name: 'outputPath', type: 'String', description: 'Output file path' },
                    { name: 'presetPath', type: 'String', description: 'Path to .epr preset' },
                    { name: 'workAreaType', type: 'Integer', description: '0=entire, 1=in-out, 2=work area' }
                ]
            },
            exportAsProject: {
                returnType: 'String',
                description: 'Exports sequence as new project',
                signature: 'exportAsProject(exportPath)',
                parameters: [
                    { name: 'exportPath', type: 'String', description: 'Output project path' }
                ]
            },
            
            // Auto-Reframe
            createAutoReframedSequence: {
                returnType: 'Boolean',
                description: 'Creates auto-reframed version',
                signature: 'createAutoReframedSequence(targetFrameWidth, targetFrameHeight, motionPreset, newName)',
                parameters: [
                    { name: 'targetFrameWidth', type: 'Integer', description: 'Target width' },
                    { name: 'targetFrameHeight', type: 'Integer', description: 'Target height' },
                    { name: 'motionPreset', type: 'Integer', description: 'Motion tracking preset' },
                    { name: 'newName', type: 'String', description: 'New sequence name' }
                ]
            },
            
            // Selection
            getSelection: {
                returnType: 'Array',
                description: 'Gets selected track items',
                signature: 'getSelection()',
                parameters: []
            },
            setSelection: {
                returnType: 'Boolean',
                description: 'Sets track item selection',
                signature: 'setSelection(trackItems)',
                parameters: [
                    { name: 'trackItems', type: 'Array', description: 'Array of TrackItem objects' }
                ]
            },
            
            // Rendering
            isDoneRendering: {
                returnType: 'Boolean',
                description: 'Checks if rendering is complete',
                signature: 'isDoneRendering()',
                parameters: []
            }
        }
    },

    // ============================================
    // PROJECT ITEM
    // ============================================
    ProjectItem: {
        type: 'object',
        description: 'Represents items in project panel',
        properties: {
            name: {
                type: 'String',
                description: 'Item name',
                readonly: false
            },
            nodeId: {
                type: 'String',
                description: 'Unique node ID',
                readonly: true
            },
            type: {
                type: 'Integer',
                description: 'Type: 1=CLIP, 2=BIN, 3=ROOT, 4=FILE',
                readonly: true
            },
            treePath: {
                type: 'String',
                description: 'Full path in project hierarchy',
                readonly: true
            },
            children: {
                type: 'ProjectItemCollection',
                description: 'Child items (if bin)',
                readonly: true
            }
        },
        methods: {
            // Media
            getMediaPath: {
                returnType: 'String',
                description: 'Gets path to source media',
                signature: 'getMediaPath()',
                parameters: []
            },
            changeMediaPath: {
                returnType: 'Number',
                description: 'Relinks to new media file',
                signature: 'changeMediaPath(newPath, overrideChecks)',
                parameters: [
                    { name: 'newPath', type: 'String', description: 'New media path' },
                    { name: 'overrideChecks', type: 'Boolean', description: 'Skip validation' }
                ]
            },
            canChangeMediaPath: {
                returnType: 'Boolean',
                description: 'Checks if media can be relinked',
                signature: 'canChangeMediaPath()',
                parameters: []
            },
            
            // Proxies
            attachProxy: {
                returnType: 'Number',
                description: 'Attaches proxy or hi-res media',
                signature: 'attachProxy(mediaPath, isHiRes)',
                parameters: [
                    { name: 'mediaPath', type: 'String', description: 'Path to proxy/hi-res' },
                    { name: 'isHiRes', type: 'Integer', description: '0=proxy, 1=hi-res' }
                ]
            },
            hasProxy: {
                returnType: 'Integer',
                description: 'Checks proxy status (0=none, 1=attached, 2=pending)',
                signature: 'hasProxy()',
                parameters: []
            },
            getProxyPath: {
                returnType: 'String',
                description: 'Gets proxy file path',
                signature: 'getProxyPath()',
                parameters: []
            },
            
            // Markers
            getMarkers: {
                returnType: 'MarkerCollection',
                description: 'Gets item markers',
                signature: 'getMarkers()',
                parameters: []
            },
            
            // Bins
            createBin: {
                returnType: 'ProjectItem',
                description: 'Creates child bin',
                signature: 'createBin(name)',
                parameters: [
                    { name: 'name', type: 'String', description: 'Bin name' }
                ]
            },
            deleteBin: {
                returnType: 'Number',
                description: 'Deletes bin and contents',
                signature: 'deleteBin()',
                parameters: []
            },
            createSmartBin: {
                returnType: 'ProjectItem',
                description: 'Creates smart bin with query',
                signature: 'createSmartBin(name, query)',
                parameters: [
                    { name: 'name', type: 'String', description: 'Smart bin name' },
                    { name: 'query', type: 'String', description: 'Search query' }
                ]
            },
            
            // Footage
            getFootageInterpretation: {
                returnType: 'Object',
                description: 'Gets interpretation settings',
                signature: 'getFootageInterpretation()',
                parameters: []
            },
            setFootageInterpretation: {
                returnType: 'Boolean',
                description: 'Sets interpretation settings',
                signature: 'setFootageInterpretation(interpretationObj)',
                parameters: [
                    { name: 'interpretationObj', type: 'Object', description: 'Interpretation object' }
                ]
            },
            
            // Metadata
            getProjectMetadata: {
                returnType: 'String',
                description: 'Gets XMP metadata as XML',
                signature: 'getProjectMetadata()',
                parameters: []
            },
            setProjectMetadata: {
                returnType: 'Boolean',
                description: 'Sets XMP metadata from XML',
                signature: 'setProjectMetadata(xml, fields)',
                parameters: [
                    { name: 'xml', type: 'String', description: 'XMP metadata XML' },
                    { name: 'fields', type: 'Array', description: 'Array of field names' }
                ]
            },
            
            // Offline
            setOffline: {
                returnType: 'Boolean',
                description: 'Sets item offline',
                signature: 'setOffline()',
                parameters: []
            },
            
            // Info
            getColorSpace: {
                returnType: 'String',
                description: 'Gets color space',
                signature: 'getColorSpace()',
                parameters: []
            },
            isSequence: {
                returnType: 'Boolean',
                description: 'Checks if item is a sequence',
                signature: 'isSequence()',
                parameters: []
            },
            isOffline: {
                returnType: 'Boolean',
                description: 'Checks if media is offline',
                signature: 'isOffline()',
                parameters: []
            },
            isMergedClip: {
                returnType: 'Boolean',
                description: 'Checks if item is merged clip',
                signature: 'isMergedClip()',
                parameters: []
            },
            isMulticamClip: {
                returnType: 'Boolean',
                description: 'Checks if item is multicam clip',
                signature: 'isMulticamClip()',
                parameters: []
            },
            isAdjustmentLayer: {
                returnType: 'Boolean',
                description: 'Checks if item is adjustment layer',
                signature: 'isAdjustmentLayer()',
                parameters: []
            },
            
            // Subclips
            createSubClip: {
                returnType: 'ProjectItem',
                description: 'Creates subclip from in/out points',
                signature: 'createSubClip(name, startTime, endTime, hasHardBoundaries, takeVideo, takeAudio)',
                parameters: [
                    { name: 'name', type: 'String', description: 'Subclip name' },
                    { name: 'startTime', type: 'String', description: 'Start time in ticks' },
                    { name: 'endTime', type: 'String', description: 'End time in ticks' },
                    { name: 'hasHardBoundaries', type: 'Integer', description: '1=hard boundaries' },
                    { name: 'takeVideo', type: 'Integer', description: '1=include video' },
                    { name: 'takeAudio', type: 'Integer', description: '1=include audio' }
                ]
            },
            
            // Transcription
            startTranscription: {
                returnType: 'Boolean',
                description: 'Starts speech-to-text transcription',
                signature: 'startTranscription(languageIndex)',
                parameters: [
                    { name: 'languageIndex', type: 'Integer', description: 'Language index' }
                ]
            },
            getTranscriptionText: {
                returnType: 'String',
                description: 'Gets transcription text',
                signature: 'getTranscriptionText()',
                parameters: []
            }
        }
    },

    // ============================================
    // TRACK
    // ============================================
    Track: {
        type: 'object',
        description: 'Represents an audio or video track',
        properties: {
            name: {
                type: 'String',
                description: 'Track name',
                readonly: false
            },
            id: {
                type: 'Integer',
                description: 'Track ID',
                readonly: true
            },
            clips: {
                type: 'TrackItemCollection',
                description: 'Clips on this track',
                readonly: true
            },
            transitions: {
                type: 'TrackItemCollection',
                description: 'Transitions on this track',
                readonly: true
            },
            mediaType: {
                type: 'String',
                description: 'Type: "Video" or "Audio"',
                readonly: true
            }
        },
        methods: {
            isMuted: {
                returnType: 'Boolean',
                description: 'Checks if track is muted',
                signature: 'isMuted()',
                parameters: []
            },
            setMute: {
                returnType: 'Number',
                description: 'Sets mute state',
                signature: 'setMute(state)',
                parameters: [
                    { name: 'state', type: 'Integer', description: '1=mute, 0=unmute' }
                ]
            },
            isTargeted: {
                returnType: 'Boolean',
                description: 'Checks if track is targeted',
                signature: 'isTargeted()',
                parameters: []
            },
            setTargeted: {
                returnType: 'Number',
                description: 'Sets targeted state',
                signature: 'setTargeted(state, shouldBeSoloTargeted)',
                parameters: [
                    { name: 'state', type: 'Integer', description: '1=target, 0=untarget' },
                    { name: 'shouldBeSoloTargeted', type: 'Integer', description: '1=solo target' }
                ]
            },
            insertClip: {
                returnType: 'TrackItem',
                description: 'Inserts clip on track',
                signature: 'insertClip(projectItem, time)',
                parameters: [
                    { name: 'projectItem', type: 'ProjectItem', description: 'Item to insert' },
                    { name: 'time', type: 'String', description: 'Time in ticks' }
                ]
            },
            overwriteClip: {
                returnType: 'TrackItem',
                description: 'Overwrites clip on track',
                signature: 'overwriteClip(projectItem, time)',
                parameters: [
                    { name: 'projectItem', type: 'ProjectItem', description: 'Item to overwrite' },
                    { name: 'time', type: 'String', description: 'Time in ticks' }
                ]
            }
        }
    },

    // ============================================
    // TRACK ITEM (Clip)
    // ============================================
    TrackItem: {
        type: 'object',
        description: 'Represents a clip on a track',
        properties: {
            name: {
                type: 'String',
                description: 'Clip name',
                readonly: false
            },
            nodeId: {
                type: 'String',
                description: 'Unique node ID',
                readonly: true
            },
            type: {
                type: 'Integer',
                description: 'Type: 1=Clip, 2=Transition',
                readonly: true
            },
            start: {
                type: 'Time',
                description: 'Start time in sequence',
                readonly: false
            },
            end: {
                type: 'Time',
                description: 'End time in sequence',
                readonly: false
            },
            duration: {
                type: 'Time',
                description: 'Duration',
                readonly: true
            },
            inPoint: {
                type: 'Time',
                description: 'In point in source media',
                readonly: false
            },
            outPoint: {
                type: 'Time',
                description: 'Out point in source media',
                readonly: false
            },
            projectItem: {
                type: 'ProjectItem',
                description: 'Source project item',
                readonly: true
            },
            mediaType: {
                type: 'String',
                description: 'Type: "Video" or "Audio"',
                readonly: true
            },
            disabled: {
                type: 'Boolean',
                description: 'Whether clip is disabled',
                readonly: false
            },
            components: {
                type: 'ComponentCollection',
                description: 'Effects on this clip',
                readonly: true
            }
        },
        methods: {
            remove: {
                returnType: 'Number',
                description: 'Removes clip from timeline',
                signature: 'remove(ripple, alignToVideo)',
                parameters: [
                    { name: 'ripple', type: 'Integer', description: '1=ripple, 0=leave gap' },
                    { name: 'alignToVideo', type: 'Integer', description: '1=align to video frames' }
                ]
            },
            move: {
                returnType: 'Boolean',
                description: 'Moves clip to new position',
                signature: 'move(newTime)',
                parameters: [
                    { name: 'newTime', type: 'String', description: 'New time in ticks' }
                ]
            },
            setSelected: {
                returnType: 'Boolean',
                description: 'Sets selection state',
                signature: 'setSelected(selected, updateUI)',
                parameters: [
                    { name: 'selected', type: 'Boolean', description: 'True to select' },
                    { name: 'updateUI', type: 'Boolean', description: 'True to update UI' }
                ]
            },
            isSelected: {
                returnType: 'Boolean',
                description: 'Checks if clip is selected',
                signature: 'isSelected()',
                parameters: []
            },
            isAdjustmentLayer: {
                returnType: 'Boolean',
                description: 'Checks if clip is adjustment layer',
                signature: 'isAdjustmentLayer()',
                parameters: []
            },
            getSpeed: {
                returnType: 'Number',
                description: 'Gets playback speed percentage',
                signature: 'getSpeed()',
                parameters: []
            },
            setSpeed: {
                returnType: 'Boolean',
                description: 'Sets playback speed',
                signature: 'setSpeed(speed)',
                parameters: [
                    { name: 'speed', type: 'Number', description: 'Speed percentage (100=normal)' }
                ]
            },
            reverse: {
                returnType: 'Boolean',
                description: 'Reverses clip playback',
                signature: 'reverse(keepAudioPitch)',
                parameters: [
                    { name: 'keepAudioPitch', type: 'Boolean', description: 'Maintain pitch' }
                ]
            },
            getColorLabel: {
                returnType: 'Integer',
                description: 'Gets color label index',
                signature: 'getColorLabel()',
                parameters: []
            },
            setColorLabel: {
                returnType: 'Boolean',
                description: 'Sets color label',
                signature: 'setColorLabel(colorIndex)',
                parameters: [
                    { name: 'colorIndex', type: 'Integer', description: 'Color index (0-15)' }
                ]
            },
            getLinkedItems: {
                returnType: 'Array',
                description: 'Gets linked track items',
                signature: 'getLinkedItems()',
                parameters: []
            },
            addMotionEffect: {
                returnType: 'Component',
                description: 'Adds Motion effect',
                signature: 'addMotionEffect()',
                parameters: []
            },
            addFilter: {
                returnType: 'Component',
                description: 'Adds video/audio effect',
                signature: 'addFilter(matchName)',
                parameters: [
                    { name: 'matchName', type: 'String', description: 'Effect match name' }
                ]
            },
            getMatchName: {
                returnType: 'String',
                description: 'Gets clip match name',
                signature: 'getMatchName()',
                parameters: []
            }
        }
    },

    // ============================================
    // MARKER
    // ============================================
    Marker: {
        type: 'object',
        description: 'Represents a marker',
        properties: {
            name: {
                type: 'String',
                description: 'Marker name',
                readonly: false
            },
            comments: {
                type: 'String',
                description: 'Marker comments',
                readonly: false
            },
            start: {
                type: 'Time',
                description: 'Start time',
                readonly: false
            },
            end: {
                type: 'Time',
                description: 'End time',
                readonly: false
            },
            type: {
                type: 'String',
                description: 'Type: "Comment", "Chapter", "Segmentation", "WebLink"',
                readonly: true
            },
            guid: {
                type: 'String',
                description: 'Unique identifier',
                readonly: true
            }
        },
        methods: {
            setTypeAsComment: {
                returnType: 'Number',
                description: 'Sets marker as Comment type',
                signature: 'setTypeAsComment()',
                parameters: []
            },
            setTypeAsChapter: {
                returnType: 'Number',
                description: 'Sets marker as Chapter type',
                signature: 'setTypeAsChapter()',
                parameters: []
            },
            setTypeAsWebLink: {
                returnType: 'Number',
                description: 'Sets marker as WebLink type',
                signature: 'setTypeAsWebLink(url, frameTarget)',
                parameters: [
                    { name: 'url', type: 'String', description: 'Web URL' },
                    { name: 'frameTarget', type: 'String', description: 'Frame target' }
                ]
            },
            setTypeAsSegmentation: {
                returnType: 'Number',
                description: 'Sets marker as Segmentation type',
                signature: 'setTypeAsSegmentation()',
                parameters: []
            },
            getColorByIndex: {
                returnType: 'Array',
                description: 'Gets marker color as RGB array',
                signature: 'getColorByIndex()',
                parameters: []
            },
            setColorByIndex: {
                returnType: 'Number',
                description: 'Sets marker color by index',
                signature: 'setColorByIndex(colorIndex)',
                parameters: [
                    { name: 'colorIndex', type: 'Integer', description: 'Color index (0-15)' }
                ]
            }
        }
    },

    // ============================================
    // COMPONENT (Effect)
    // ============================================
    Component: {
        type: 'object',
        description: 'Represents an effect or component',
        properties: {
            matchName: {
                type: 'String',
                description: 'Unique effect identifier',
                readonly: true
            },
            displayName: {
                type: 'String',
                description: 'Display name',
                readonly: true
            },
            properties: {
                type: 'ComponentParamCollection',
                description: 'Effect parameters',
                readonly: true
            }
        }
    },

    // ============================================
    // COMPONENT PARAM (Effect Parameter)
    // ============================================
    ComponentParam: {
        type: 'object',
        description: 'Represents an effect parameter',
        properties: {
            displayName: {
                type: 'String',
                description: 'Parameter display name',
                readonly: true
            }
        },
        methods: {
            getValue: {
                returnType: 'Object',
                description: 'Gets parameter value at current time',
                signature: 'getValue()',
                parameters: []
            },
            setValue: {
                returnType: 'Boolean',
                description: 'Sets parameter value',
                signature: 'setValue(value, updateUI)',
                parameters: [
                    { name: 'value', type: 'Any', description: 'New value' },
                    { name: 'updateUI', type: 'Boolean', description: 'Update UI' }
                ]
            },
            getKeys: {
                returnType: 'Object',
                description: 'Gets all keyframes',
                signature: 'getKeys()',
                parameters: []
            },
            addKey: {
                returnType: 'Boolean',
                description: 'Adds keyframe at time',
                signature: 'addKey(time)',
                parameters: [
                    { name: 'time', type: 'Time', description: 'Time for keyframe' }
                ]
            },
            removeKey: {
                returnType: 'Boolean',
                description: 'Removes keyframe at index',
                signature: 'removeKey(index)',
                parameters: [
                    { name: 'index', type: 'Integer', description: 'Keyframe index' }
                ]
            },
            removeKeyRange: {
                returnType: 'Boolean',
                description: 'Removes keyframes in range',
                signature: 'removeKeyRange(startTime, endTime, updateUI)',
                parameters: [
                    { name: 'startTime', type: 'Time', description: 'Start time' },
                    { name: 'endTime', type: 'Time', description: 'End time' },
                    { name: 'updateUI', type: 'Boolean', description: 'Update UI' }
                ]
            },
            setInterpolationTypeAtKey: {
                returnType: 'Boolean',
                description: 'Sets keyframe interpolation',
                signature: 'setInterpolationTypeAtKey(keyIndex, type, updateUI)',
                parameters: [
                    { name: 'keyIndex', type: 'Integer', description: 'Keyframe index' },
                    { name: 'type', type: 'Integer', description: 'Interpolation type' },
                    { name: 'updateUI', type: 'Boolean', description: 'Update UI' }
                ]
            },
            isTimeVarying: {
                returnType: 'Boolean',
                description: 'Checks if parameter is animated',
                signature: 'isTimeVarying()',
                parameters: []
            },
            setTimeVarying: {
                returnType: 'Boolean',
                description: 'Enables/disables animation',
                signature: 'setTimeVarying(timeVarying)',
                parameters: [
                    { name: 'timeVarying', type: 'Boolean', description: 'True to enable' }
                ]
            }
        }
    },

    // ============================================
    // TIME
    // ============================================
    Time: {
        type: 'object',
        description: 'Represents a time value',
        properties: {
            seconds: {
                type: 'Number',
                description: 'Time in seconds',
                readonly: false
            },
            ticks: {
                type: 'String',
                description: 'Time in ticks (high precision)',
                readonly: false
            }
        }
    },

    // ============================================
    // COLLECTIONS
    // ============================================
    ProjectItemCollection: {
        type: 'object',
        description: 'Collection of ProjectItem objects',
        properties: {
            numItems: {
                type: 'Integer',
                description: 'Number of items',
                readonly: true
            }
        }
    },

    SequenceCollection: {
        type: 'object',
        description: 'Collection of Sequence objects',
        properties: {
            numSequences: {
                type: 'Integer',
                description: 'Number of sequences',
                readonly: true
            }
        }
    },

    TrackCollection: {
        type: 'object',
        description: 'Collection of Track objects',
        properties: {
            numTracks: {
                type: 'Integer',
                description: 'Number of tracks',
                readonly: true
            }
        }
    },

    TrackItemCollection: {
        type: 'object',
        description: 'Collection of TrackItem objects',
        properties: {
            numItems: {
                type: 'Integer',
                description: 'Number of clips',
                readonly: true
            }
        }
    },

    MarkerCollection: {
        type: 'object',
        description: 'Collection of Marker objects',
        properties: {
            numMarkers: {
                type: 'Integer',
                description: 'Number of markers',
                readonly: true
            }
        },
        methods: {
            createMarker: {
                returnType: 'Marker',
                description: 'Creates new marker',
                signature: 'createMarker(time)',
                parameters: [
                    { name: 'time', type: 'Number', description: 'Time in seconds' }
                ]
            },
            deleteMarker: {
                returnType: 'Boolean',
                description: 'Deletes marker',
                signature: 'deleteMarker(marker)',
                parameters: [
                    { name: 'marker', type: 'Marker', description: 'Marker to delete' }
                ]
            },
            getFirstMarker: {
                returnType: 'Marker',
                description: 'Gets first marker',
                signature: 'getFirstMarker()',
                parameters: []
            },
            getLastMarker: {
                returnType: 'Marker',
                description: 'Gets last marker',
                signature: 'getLastMarker()',
                parameters: []
            },
            getNextMarker: {
                returnType: 'Marker',
                description: 'Gets next marker after specified marker',
                signature: 'getNextMarker(marker)',
                parameters: [
                    { name: 'marker', type: 'Marker', description: 'Current marker' }
                ]
            },
            getPrevMarker: {
                returnType: 'Marker',
                description: 'Gets previous marker',
                signature: 'getPrevMarker(marker)',
                parameters: [
                    { name: 'marker', type: 'Marker', description: 'Current marker' }
                ]
            }
        }
    },

    ComponentCollection: {
        type: 'object',
        description: 'Collection of Component (effect) objects',
        properties: {
            numItems: {
                type: 'Integer',
                description: 'Number of effects',
                readonly: true
            }
        }
    },

    ComponentParamCollection: {
        type: 'object',
        description: 'Collection of ComponentParam objects',
        properties: {
            numItems: {
                type: 'Integer',
                description: 'Number of parameters',
                readonly: true
            }
        }
    },

    ProjectCollection: {
        type: 'object',
        description: 'Collection of Project objects',
        properties: {
            numProjects: {
                type: 'Integer',
                description: 'Number of open projects',
                readonly: true
            }
        }
    },

    // ============================================
    // ADDITIONAL OBJECTS
    // ============================================
    
    Properties: {
        type: 'object',
        description: 'Application properties interface',
        properties: {},
        methods: {
            getProperty: {
                returnType: 'String',
                description: 'Gets property value',
                signature: 'getProperty(property)',
                parameters: [
                    { name: 'property', type: 'String', description: 'Property name' }
                ]
            },
            setProperty: {
                returnType: 'null',
                description: 'Sets property value',
                signature: 'setProperty(property, value)',
                parameters: [
                    { name: 'property', type: 'String', description: 'Property name' },
                    { name: 'value', type: 'Any', description: 'New value' }
                ]
            },
            clearProperty: {
                returnType: 'Boolean',
                description: 'Clears property',
                signature: 'clearProperty(property)',
                parameters: [
                    { name: 'property', type: 'String', description: 'Property name' }
                ]
            },
            isValid: {
                returnType: 'Boolean',
                description: 'Checks if property name is valid',
                signature: 'isValid(property)',
                parameters: [
                    { name: 'property', type: 'String', description: 'Property name' }
                ]
            }
        }
    },

    Encoder: {
        type: 'object',
        description: 'Adobe Media Encoder interface',
        properties: {},
        methods: {
            launchEncoder: {
                returnType: 'Number',
                description: 'Launches Adobe Media Encoder',
                signature: 'launchEncoder()',
                parameters: []
            },
            encodeSequence: {
                returnType: 'String',
                description: 'Adds sequence to AME queue',
                signature: 'encodeSequence(sequence, outputPath, presetPath, workAreaType, removeOnCompletion)',
                parameters: [
                    { name: 'sequence', type: 'Sequence', description: 'Sequence to encode' },
                    { name: 'outputPath', type: 'String', description: 'Output file path' },
                    { name: 'presetPath', type: 'String', description: 'Path to .epr preset' },
                    { name: 'workAreaType', type: 'Integer', description: '0=entire, 1=in-out, 2=work area' },
                    { name: 'removeOnCompletion', type: 'Integer', description: '1=remove from queue when done' }
                ]
            },
            encodeProjectItem: {
                returnType: 'String',
                description: 'Encodes project item',
                signature: 'encodeProjectItem(projectItem, outputPath, presetPath, workAreaType)',
                parameters: [
                    { name: 'projectItem', type: 'ProjectItem', description: 'Item to encode' },
                    { name: 'outputPath', type: 'String', description: 'Output path' },
                    { name: 'presetPath', type: 'String', description: 'Preset path' },
                    { name: 'workAreaType', type: 'Integer', description: 'Work area type' }
                ]
            },
            encodeFile: {
                returnType: 'String',
                description: 'Encodes file using AME',
                signature: 'encodeFile(inputPath, outputPath, presetPath, removeOnCompletion)',
                parameters: [
                    { name: 'inputPath', type: 'String', description: 'Input file path' },
                    { name: 'outputPath', type: 'String', description: 'Output file path' },
                    { name: 'presetPath', type: 'String', description: 'Preset file path' },
                    { name: 'removeOnCompletion', type: 'Integer', description: '1=remove when done' }
                ]
            },
            setEmbeddedXMPEnabled: {
                returnType: 'Boolean',
                description: 'Enables/disables embedded XMP',
                signature: 'setEmbeddedXMPEnabled(enabled)',
                parameters: [
                    { name: 'enabled', type: 'Boolean', description: 'True to enable' }
                ]
            },
            setSidecarXMPEnabled: {
                returnType: 'Boolean',
                description: 'Enables/disables sidecar XMP',
                signature: 'setSidecarXMPEnabled(enabled)',
                parameters: [
                    { name: 'enabled', type: 'Boolean', description: 'True to enable' }
                ]
            },
            startBatch: {
                returnType: 'Boolean',
                description: 'Starts AME batch processing',
                signature: 'startBatch()',
                parameters: []
            }
        }
    },

    SourceMonitor: {
        type: 'object',
        description: 'Source monitor interface',
        properties: {},
        methods: {
            openProjectItem: {
                returnType: 'Number',
                description: 'Opens item in Source monitor',
                signature: 'openProjectItem(projectItem)',
                parameters: [
                    { name: 'projectItem', type: 'ProjectItem', description: 'Item to open' }
                ]
            },
            closeClip: {
                returnType: 'Number',
                description: 'Closes current clip',
                signature: 'closeClip()',
                parameters: []
            },
            closeAllClips: {
                returnType: 'Number',
                description: 'Closes all clips',
                signature: 'closeAllClips()',
                parameters: []
            },
            play: {
                returnType: 'Number',
                description: 'Starts playback',
                signature: 'play(speed)',
                parameters: [
                    { name: 'speed', type: 'Number', description: 'Playback speed (1.0=normal)' }
                ]
            }
        }
    },

    Production: {
        type: 'object',
        description: 'Team Projects production',
        properties: {
            name: {
                type: 'String',
                description: 'Production name',
                readonly: false
            }
        },
        methods: {
            getLocked: {
                returnType: 'Boolean',
                description: 'Checks if production is locked',
                signature: 'getLocked()',
                parameters: []
            }
        }
    },

    Anywhere: {
        type: 'object',
        description: 'Premiere Pro Anywhere functionality',
        properties: {
            isProductionOpen: {
                type: 'Boolean',
                description: 'Whether a production is open',
                readonly: true
            }
        },
        methods: {
            getAuthenticationToken: {
                returnType: 'String',
                description: 'Gets authentication token',
                signature: 'getAuthenticationToken()',
                parameters: []
            },
            isConnected: {
                returnType: 'Boolean',
                description: 'Checks connection status',
                signature: 'isConnected()',
                parameters: []
            },
            listProductions: {
                returnType: 'String',
                description: 'Lists available productions',
                signature: 'listProductions()',
                parameters: []
            },
            openProduction: {
                returnType: 'Boolean',
                description: 'Opens a production',
                signature: 'openProduction(productionURL)',
                parameters: [
                    { name: 'productionURL', type: 'String', description: 'Production URL' }
                ]
            }
        }
    }
};

// ============================================
// CONSTANTS
// ============================================
const EXTENDSCRIPT_CONSTANTS = {
    ProjectItemType: {
        CLIP: 1,
        BIN: 2,
        ROOT: 3,
        FILE: 4
    },
    
    TrackItemType: {
        CLIP: 1,
        TRANSITION: 2
    },
    
    WorkAreaType: {
        ENCODE_ENTIRE: 0,
        ENCODE_IN_TO_OUT: 1,
        ENCODE_WORK_AREA: 2
    },
    
    ColorLabelIndex: {
        VIOLET: 0,
        IRIS: 1,
        CARIBBEAN: 2,
        LAVENDER: 3,
        CERULEAN: 4,
        FOREST: 5,
        ROSE: 6,
        MANGO: 7,
        PURPLE: 8,
        BLUE: 9,
        TEAL: 10,
        MAGENTA: 11,
        TAN: 12,
        GREEN: 13,
        BROWN: 14,
        YELLOW: 15
    },
    
    KeyframeInterpolationType: {
        LINEAR: 1,
        BEZIER: 2,
        BEZIER_CONTINUOUS: 3,
        BEZIER_DISCONTINUOUS: 4,
        HOLD: 5,
        TIME_INTERPOLATION: 6
    }
};

// ============================================
// EXTENDSCRIPT GLOBAL UTILITIES
// ============================================
const EXTENDSCRIPT_GLOBALS = {
    '$': {
        type: 'object',
        description: 'ExtendScript utility object',
        methods: {
            writeln: {
                returnType: 'void',
                description: 'Writes text to console with newline',
                signature: '$.writeln(text)',
                parameters: [
                    { name: 'text', type: 'String', description: 'Text to output' }
                ]
            },
            write: {
                returnType: 'void',
                description: 'Writes text to console',
                signature: '$.write(text)',
                parameters: [
                    { name: 'text', type: 'String', description: 'Text to output' }
                ]
            }
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXTENDSCRIPT_API, EXTENDSCRIPT_CONSTANTS, EXTENDSCRIPT_GLOBALS };
} else {
    window.EXTENDSCRIPT_API = EXTENDSCRIPT_API;
    window.EXTENDSCRIPT_CONSTANTS = EXTENDSCRIPT_CONSTANTS;
    window.EXTENDSCRIPT_GLOBALS = EXTENDSCRIPT_GLOBALS;
}
