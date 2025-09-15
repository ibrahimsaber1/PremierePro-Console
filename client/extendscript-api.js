// client/extendscript-api.js - Enhanced with complete Premiere Pro API
// ExtendScript API data structure for Premiere Pro based on official documentation

const EXTENDSCRIPT_API = {
    app: {
        type: 'Application',
        description: 'The global application object providing access to Premiere Pro',
        properties: {
            // Project Management
            project: {
                type: 'Project',
                description: 'The currently active project',
                readonly: true,
                properties: {
                    activeSequence: {
                        type: 'Sequence',
                        description: 'The currently active sequence within the project',
                        readonly: false
                    },
                    name: {
                        type: 'String',
                        description: 'The name of the project',
                        readonly: true
                    },
                    path: {
                        type: 'String',
                        description: 'The file path of the project',
                        readonly: true
                    },
                    rootItem: {
                        type: 'ProjectItem',
                        description: 'Root project item representing the project structure',
                        readonly: true
                    },
                    sequences: {
                        type: 'SequenceCollection',
                        description: 'Collection of all sequences in the project',
                        readonly: true
                    },
                    documentID: {
                        type: 'String',
                        description: 'Unique identifier for this project (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)',
                        readonly: true
                    },
                    isCloudProject: {
                        type: 'Boolean',
                        description: 'Whether the project is a cloud project',
                        readonly: true
                    },
                    cloudProjectlocalID: {
                        type: 'String',
                        description: 'The ID of cloud project',
                        readonly: true
                    }
                },
                methods: {
                    save: {
                        returnType: 'Number',
                        description: 'Saves the project at its current path',
                        signature: 'save()',
                        parameters: []
                    },
                    saveAs: {
                        returnType: 'Number',
                        description: 'Saves the project to a new location',
                        signature: 'saveAs(path)',
                        parameters: [
                            { name: 'path', type: 'String', description: 'New file path for the project' }
                        ]
                    },
                    closeDocument: {
                        returnType: 'Number',
                        description: 'Closes this project',
                        signature: 'closeDocument(saveFirst, promptIfDirty)',
                        parameters: [
                            { name: 'saveFirst', type: 'Integer', description: 'If 1, project will be saved before closing' },
                            { name: 'promptIfDirty', type: 'Integer', description: 'If 1, user will be asked to save changes' }
                        ]
                    },
                    importFiles: {
                        returnType: 'Boolean',
                        description: 'Imports media files into the project',
                        signature: 'importFiles(filePaths, suppressUI, targetBin, importAsNumberedStills)',
                        parameters: [
                            { name: 'filePaths', type: 'Array', description: 'Array of file paths to import' },
                            { name: 'suppressUI', type: 'Boolean', description: 'Whether to suppress warning dialogs' },
                            { name: 'targetBin', type: 'ProjectItem', description: 'Bin to import files into' },
                            { name: 'importAsNumberedStills', type: 'Boolean', description: 'Interpret as image sequence' }
                        ]
                    },
                    newSequence: {
                        returnType: 'Sequence',
                        description: 'Creates a new sequence based on a preset',
                        signature: 'newSequence(name, pathToSequencePreset)',
                        parameters: [
                            { name: 'name', type: 'String', description: 'Name for the new sequence' },
                            { name: 'pathToSequencePreset', type: 'String', description: 'Path to .sqpreset file' }
                        ]
                    },
                    createNewSequence: {
                        returnType: 'Sequence',
                        description: 'Creates a new sequence with specified ID',
                        signature: 'createNewSequence(sequenceName, sequenceID)',
                        parameters: [
                            { name: 'sequenceName', type: 'String', description: 'Name of the sequence' },
                            { name: 'sequenceID', type: 'String', description: 'Unique ID for the sequence' }
                        ]
                    },
                    deleteSequence: {
                        returnType: 'Boolean',
                        description: 'Deletes the specified sequence from the project',
                        signature: 'deleteSequence(sequence)',
                        parameters: [
                            { name: 'sequence', type: 'Sequence', description: 'Sequence to delete' }
                        ]
                    },
                    openSequence: {
                        returnType: 'Boolean',
                        description: 'Makes the sequence with provided ID active',
                        signature: 'openSequence(sequenceID)',
                        parameters: [
                            { name: 'sequenceID', type: 'String', description: 'ID of sequence to open' }
                        ]
                    },
                    exportAAF: {
                        returnType: 'Number',
                        description: 'Exports an AAF file of the specified sequence',
                        signature: 'exportAAF(sequenceToExport, outputPath, mixdownVideo, explodeToMono, sampleRate, bitsPerSample, embedAudio, audioFileFormat, trimSources, handleFrames, presetPath, renderAudioEffects, includeClipCopies, preserveParentFolder)',
                        parameters: [
                            { name: 'sequenceToExport', type: 'Sequence', description: 'Sequence to export' },
                            { name: 'outputPath', type: 'String', description: 'Output path for AAF file' },
                            { name: 'mixdownVideo', type: 'Integer', description: 'If 1, render video before export' },
                            { name: 'explodeToMono', type: 'Integer', description: 'If 1, break stereo tracks to mono' },
                            { name: 'sampleRate', type: 'Integer', description: 'Sample rate of output audio' },
                            { name: 'bitsPerSample', type: 'Integer', description: 'Bits per sample of audio output' },
                            { name: 'embedAudio', type: 'Integer', description: 'If 1, audio is embedded; if 0, external' },
                            { name: 'audioFileFormat', type: 'Integer', description: '0=AIFF, 1=WAV' },
                            { name: 'trimSources', type: 'Integer', description: 'If 1, trim and re-encode media' },
                            { name: 'handleFrames', type: 'Integer', description: 'Number of handle frames (0-1000)' },
                            { name: 'presetPath', type: 'String', description: 'Path to export preset (.epr) file' },
                            { name: 'renderAudioEffects', type: 'Integer', description: 'If 1, render audio effects' },
                            { name: 'includeClipCopies', type: 'Integer', description: 'If 1, include each copy of a clip' },
                            { name: 'preserveParentFolder', type: 'Integer', description: 'If 1, preserve parent folder in output' }
                        ]
                    },
                    exportFinalCutProXML: {
                        returnType: 'Number',
                        description: 'Exports FCP XML of entire project',
                        signature: 'exportFinalCutProXML(outputPath, suppressUI)',
                        parameters: [
                            { name: 'outputPath', type: 'String', description: 'Output path for XML file' },
                            { name: 'suppressUI', type: 'Integer', description: 'If 1, suppress warnings/alerts' }
                        ]
                    }
                }
            },

            // Collections and other top-level properties
            projects: {
                type: 'ProjectCollection',
                description: 'Array referencing all open projects',
                readonly: true,
                properties: {
                    numProjects: {
                        type: 'Integer',
                        description: 'Number of projects in collection',
                        readonly: true
                    }
                }
            },

            // Production (Team Projects)
            production: {
                type: 'Production',
                description: 'The currently active production',
                readonly: true,
                properties: {
                    name: {
                        type: 'String',
                        description: 'Name of the production'
                    },
                    path: {
                        type: 'String',
                        description: 'Path to the production folder'
                    },
                    projects: {
                        type: 'ProjectCollection',
                        description: 'Projects within the production',
                        readonly: true
                    }
                },
                methods: {
                    addProject: {
                        returnType: 'Boolean',
                        description: 'Copies a project into the production directory',
                        signature: 'addProject(srcProjectPath, destProjectPath)',
                        parameters: [
                            { name: 'srcProjectPath', type: 'String', description: 'Path to source project' },
                            { name: 'destProjectPath', type: 'String', description: 'Destination path for project' }
                        ]
                    },
                    close: {
                        returnType: 'Boolean',
                        description: 'Closes the production and all open projects',
                        signature: 'close()',
                        parameters: []
                    },
                    getLocked: {
                        returnType: 'Boolean',
                        description: 'Returns lock state of a project within production',
                        signature: 'getLocked(project)',
                        parameters: [
                            { name: 'project', type: 'Project', description: 'Project to check lock state' }
                        ]
                    },
                    setLocked: {
                        returnType: 'Boolean',
                        description: 'Sets lock state of specified project',
                        signature: 'setLocked(project, locked)',
                        parameters: [
                            { name: 'project', type: 'Project', description: 'Project to modify' },
                            { name: 'locked', type: 'Boolean', description: 'True for locked, false for unlocked' }
                        ]
                    },
                    moveToTrash: {
                        returnType: 'Boolean',
                        description: 'Moves specified path to production trash folder',
                        signature: 'moveToTrash(projectOrFolderPath, suppressUI, saveProject)',
                        parameters: [
                            { name: 'projectOrFolderPath', type: 'String', description: 'Path to move to trash' },
                            { name: 'suppressUI', type: 'Boolean', description: 'Whether to suppress dialogs' },
                            { name: 'saveProject', type: 'Boolean', description: 'Whether to save project first' }
                        ]
                    }
                }
            },

            // Adobe Media Encoder
            encoder: {
                type: 'Encoder',
                description: 'Provides access to Adobe Media Encoder on the same system',
                methods: {
                    encodeSequence: {
                        returnType: 'String',
                        description: 'Renders specified sequence using AME',
                        signature: 'encodeSequence(sequence, outputPath, presetPath, workArea, removeUponCompletion)',
                        parameters: [
                            { name: 'sequence', type: 'Sequence', description: 'Sequence to render' },
                            { name: 'outputPath', type: 'String', description: 'Output file path' },
                            { name: 'presetPath', type: 'String', description: 'Path to preset (.epr) file' },
                            { name: 'workArea', type: 'Integer', description: '0=entire, 1=in-out, 2=work area' },
                            { name: 'removeUponCompletion', type: 'Integer', description: 'If 1, remove job when complete' }
                        ]
                    },
                    encodeFile: {
                        returnType: 'String',
                        description: 'Renders specified file using AME',
                        signature: 'encodeFile(filePath, outputPath, presetPath, workArea, removeUponCompletion, inPoint, outPoint)',
                        parameters: [
                            { name: 'filePath', type: 'String', description: 'Path to file to render' },
                            { name: 'outputPath', type: 'String', description: 'Output file path' },
                            { name: 'presetPath', type: 'String', description: 'Path to preset (.epr) file' },
                            { name: 'workArea', type: 'Integer', description: '0=entire, 1=in-out, 2=work area' },
                            { name: 'removeUponCompletion', type: 'Integer', description: 'If 1, remove job when complete' },
                            { name: 'inPoint', type: 'Time', description: 'In point for new file' },
                            { name: 'outPoint', type: 'Time', description: 'Out point for new file' }
                        ]
                    },
                    encodeProjectItem: {
                        returnType: 'String',
                        description: 'Renders specified project item using AME',
                        signature: 'encodeProjectItem(projectItem, outputPath, presetPath, workArea, removeUponCompletion)',
                        parameters: [
                            { name: 'projectItem', type: 'ProjectItem', description: 'Project item to render' },
                            { name: 'outputPath', type: 'String', description: 'Output file path' },
                            { name: 'presetPath', type: 'String', description: 'Path to preset (.epr) file' },
                            { name: 'workArea', type: 'Integer', description: '0=entire, 1=in-out, 2=work area' },
                            { name: 'removeUponCompletion', type: 'Integer', description: 'If 1, remove job when complete' }
                        ]
                    },
                    launchEncoder: {
                        returnType: 'Number',
                        description: 'Launches Adobe Media Encoder application',
                        signature: 'launchEncoder()',
                        parameters: []
                    },
                    startBatch: {
                        returnType: 'Number',
                        description: 'Starts rendering the AME queue',
                        signature: 'startBatch()',
                        parameters: []
                    },
                    setEmbeddedXMPEnabled: {
                        returnType: 'Number',
                        description: 'Controls embedded XMP metadata output',
                        signature: 'setEmbeddedXMPEnabled(enabled)',
                        parameters: [
                            { name: 'enabled', type: 'Integer', description: '1 to enable, 0 to disable' }
                        ]
                    },
                    setSidecarXMPEnabled: {
                        returnType: 'Number',
                        description: 'Controls sidecar XMP metadata output',
                        signature: 'setSidecarXMPEnabled(enabled)',
                        parameters: [
                            { name: 'enabled', type: 'Integer', description: '1 to enable, 0 to disable' }
                        ]
                    }
                }
            },

            // Properties
            properties: {
                type: 'Properties',
                description: 'Application properties and preferences interface',
                methods: {
                    getProperty: {
                        returnType: 'String',
                        description: 'Returns a property value',
                        signature: 'getProperty(property)',
                        parameters: [
                            { name: 'property', type: 'String', description: 'Property name to retrieve' }
                        ]
                    },
                    setProperty: {
                        returnType: 'null',
                        description: 'Sets a property value',
                        signature: 'setProperty(property, value, persistent, createIfNotExist)',
                        parameters: [
                            { name: 'property', type: 'String', description: 'Property name to set' },
                            { name: 'value', type: 'Any', description: 'Value to set' },
                            { name: 'persistent', type: 'Boolean', description: 'Whether property persists between sessions' },
                            { name: 'createIfNotExist', type: 'Boolean', description: 'Create property if it doesn\'t exist' }
                        ]
                    },
                    doesPropertyExist: {
                        returnType: 'Boolean',
                        description: 'Checks whether a property exists',
                        signature: 'doesPropertyExist(property)',
                        parameters: [
                            { name: 'property', type: 'String', description: 'Property name to check' }
                        ]
                    },
                    clearProperty: {
                        returnType: 'Boolean',
                        description: 'Clears a property',
                        signature: 'clearProperty(property)',
                        parameters: [
                            { name: 'property', type: 'String', description: 'Property name to clear' }
                        ]
                    },
                    isPropertyReadOnly: {
                        returnType: 'Boolean',
                        description: 'Checks if property is read-only',
                        signature: 'isPropertyReadOnly(property)',
                        parameters: [
                            { name: 'property', type: 'String', description: 'Property name to check' }
                        ]
                    }
                }
            },

            // Source Monitor
            sourceMonitor: {
                type: 'SourceMonitor',
                description: 'Premiere Pro Source monitor interface',
                methods: {
                    closeAllClips: {
                        returnType: 'Number',
                        description: 'Closes all clips in the Source monitor',
                        signature: 'closeAllClips()',
                        parameters: []
                    },
                    closeClip: {
                        returnType: 'Number',
                        description: 'Closes the front-most clip in Source monitor',
                        signature: 'closeClip()',
                        parameters: []
                    },
                    getPosition: {
                        returnType: 'Time',
                        description: 'Gets Source monitor current time indicator position',
                        signature: 'getPosition()',
                        parameters: []
                    },
                    getProjectItem: {
                        returnType: 'ProjectItem',
                        description: 'Gets project item open in Source monitor',
                        signature: 'getProjectItem()',
                        parameters: []
                    },
                    openFilePath: {
                        returnType: 'Boolean',
                        description: 'Opens a file in Source monitor',
                        signature: 'openFilePath(path)',
                        parameters: [
                            { name: 'path', type: 'String', description: 'Path to file to open' }
                        ]
                    },
                    openProjectItem: {
                        returnType: 'Number',
                        description: 'Opens a project item in Source monitor',
                        signature: 'openProjectItem(projectItem)',
                        parameters: [
                            { name: 'projectItem', type: 'ProjectItem', description: 'Project item to open' }
                        ]
                    },
                    play: {
                        returnType: 'Number',
                        description: 'Begins playback at specified speed',
                        signature: 'play(playbackSpeed)',
                        parameters: [
                            { name: 'playbackSpeed', type: 'Float', description: 'Playback speed multiplier' }
                        ]
                    }
                }
            },

            // Application info and paths
            version: {
                type: 'String',
                description: 'Version of Premiere Pro providing the API',
                readonly: true
            },
            build: {
                type: 'String',
                description: 'Build number of Premiere Pro',
                readonly: true
            },
            path: {
                type: 'String',
                description: 'Path to application executable',
                readonly: true
            },
            userGuid: {
                type: 'String',
                description: 'Unique identifier for current Creative Cloud user',
                readonly: true
            },
            getAppPrefPath: {
                type: 'String',
                description: 'Path to currently active preferences file',
                readonly: true
            },
            getAppSystemPrefPath: {
                type: 'String',
                description: 'Path to system configuration files',
                readonly: true
            },
            getPProPrefPath: {
                type: 'String',
                description: 'Path to Premiere Pro preferences file',
                readonly: true
            },
            getPProSystemPrefPath: {
                type: 'String',
                description: 'Path to Premiere Pro system configuration files',
                readonly: true
            }
        },
        methods: {
            // Application Methods
            quit: {
                returnType: 'void',
                description: 'Quits Premiere Pro (user prompted to save changes)',
                signature: 'quit()',
                parameters: []
            },
            enableQE: {
                returnType: 'Boolean',
                description: 'Enables Premiere Pro QE DOM',
                signature: 'enableQE()',
                parameters: []
            },
            getEnableProxies: {
                returnType: 'Number',
                description: 'Returns 1 if proxies enabled, 0 if not',
                signature: 'getEnableProxies()',
                parameters: []
            },
            setEnableProxies: {
                returnType: 'Number',
                description: 'Enables or disables proxy usage',
                signature: 'setEnableProxies(enabled)',
                parameters: [
                    { name: 'enabled', type: 'Integer', description: '1 to enable proxies, 0 to disable' }
                ]
            },
            getWorkspaces: {
                returnType: 'Array',
                description: 'Returns array of available workspace names',
                signature: 'getWorkspaces()',
                parameters: []
            },
            setWorkspace: {
                returnType: 'Boolean',
                description: 'Sets the active workspace',
                signature: 'setWorkspace(workspace)',
                parameters: [
                    { name: 'workspace', type: 'String', description: 'Name of workspace to activate' }
                ]
            },
            isDocument: {
                returnType: 'Boolean',
                description: 'Checks if file can be opened as Premiere Pro project',
                signature: 'isDocument(path)',
                parameters: [
                    { name: 'path', type: 'String', description: 'Path to file to check' }
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
                    { name: 'path', type: 'String', description: 'Full path for new project (no extension added)' }
                ]
            },
            openDocument: {
                returnType: 'Boolean',
                description: 'Opens file as Premiere Pro project',
                signature: 'openDocument(path, suppressConversionDialog, bypassLocateFileDialog, bypassWarningDialog, doNotAddToMRUList)',
                parameters: [
                    { name: 'path', type: 'String', description: 'Full path to document to open' },
                    { name: 'suppressConversionDialog', type: 'Boolean', description: 'Suppress project conversion dialog' },
                    { name: 'bypassLocateFileDialog', type: 'Boolean', description: 'Bypass locate file dialog' },
                    { name: 'bypassWarningDialog', type: 'Boolean', description: 'Bypass warning dialog' },
                    { name: 'doNotAddToMRUList', type: 'Boolean', description: 'Skip adding to Most Recently Used list' }
                ]
            },
            openFCPXML: {
                returnType: 'Boolean',
                description: 'Opens FCP XML file as Premiere Pro project',
                signature: 'openFCPXML(path, projPath)',
                parameters: [
                    { name: 'path', type: 'String', description: 'Path to FCP XML file' },
                    { name: 'projPath', type: 'String', description: 'Path for new Premiere Pro project' }
                ]
            },
            setScratchDiskPath: {
                returnType: 'Boolean',
                description: 'Sets scratch disk path for specified type',
                signature: 'setScratchDiskPath(path, scratchDiskType)',
                parameters: [
                    { name: 'path', type: 'String', description: 'New path for scratch disk' },
                    { name: 'scratchDiskType', type: 'ScratchDiskType', description: 'Type of scratch disk to set' }
                ]
            },
            setSDKEventMessage: {
                returnType: 'Boolean',
                description: 'Writes message to Premiere Pro Events panel',
                signature: 'setSDKEventMessage(message, decorator)',
                parameters: [
                    { name: 'message', type: 'String', description: 'Message to display' },
                    { name: 'decorator', type: 'String', description: 'Type: "info", "warning", or "error"' }
                ]
            },
            trace: {
                returnType: 'Boolean',
                description: 'Writes string to Premiere Pro debug console',
                signature: 'trace(message)',
                parameters: [
                    { name: 'message', type: 'String', description: 'Message to write to debug console' }
                ]
            },
            setExtensionPersistent: {
                returnType: 'Boolean',
                description: 'Sets whether extension persists in memory',
                signature: 'setExtensionPersistent(extensionID, persistent)',
                parameters: [
                    { name: 'extensionID', type: 'String', description: 'Extension ID to modify' },
                    { name: 'persistent', type: 'Integer', description: '1 to keep in memory, 0 to allow unloading' }
                ]
            },
            getProjectViewIDs: {
                returnType: 'Array',
                description: 'Returns view IDs of currently open project views',
                signature: 'getProjectViewIDs()',
                parameters: []
            },
            getProjectFromViewID: {
                returnType: 'Project',
                description: 'Returns project associated with specified view ID',
                signature: 'getProjectFromViewID(viewID)',
                parameters: [
                    { name: 'viewID', type: 'String', description: 'View ID obtained from getProjectViewIDs()' }
                ]
            },
            getCurrentProjectViewSelection: {
                returnType: 'Array',
                description: 'Returns array of selected ProjectItems in current view',
                signature: 'getCurrentProjectViewSelection()',
                parameters: []
            },
            broadcastPrefsChanged: {
                returnType: 'Boolean',
                description: 'Notifies application that preferences changed',
                signature: 'broadcastPrefsChanged(prefID)',
                parameters: [
                    { name: 'prefID', type: 'String', description: 'ID of changed preference' }
                ]
            }
        }
    }
};

// Sequence object definition
EXTENDSCRIPT_API.Sequence = {
    type: 'object',
    description: 'Represents sequences of media (timelines) in Premiere Pro',
    properties: {
        name: {
            type: 'String',
            description: 'Name of the sequence',
            readonly: false
        },
        sequenceID: {
            type: 'String',
            description: 'Unique identifier for the sequence (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)',
            readonly: true
        },
        id: {
            type: 'Integer',
            description: 'Ordinal assigned to sequence upon creation',
            readonly: true
        },
        projectItem: {
            type: 'ProjectItem',
            description: 'ProjectItem associated with the sequence',
            readonly: true
        },
        markers: {
            type: 'MarkerCollection',
            description: 'Collection of markers in the sequence',
            readonly: true
        },
        videoTracks: {
            type: 'TrackCollection',
            description: 'Collection of video tracks in the sequence',
            readonly: true
        },
        audioTracks: {
            type: 'TrackCollection',
            description: 'Collection of audio tracks in the sequence',
            readonly: true
        },
        end: {
            type: 'String',
            description: 'End time of sequence in ticks',
            readonly: true
        },
        zeroPoint: {
            type: 'String',
            description: 'Starting time of sequence in ticks',
            readonly: true
        },
        timebase: {
            type: 'String',
            description: 'Number of ticks per frame (frame duration)',
            readonly: true
        },
        frameSizeHorizontal: {
            type: 'Integer',
            description: 'Horizontal frame size (width) of sequence',
            readonly: true
        },
        frameSizeVertical: {
            type: 'Integer',
            description: 'Vertical frame size (height) of sequence',
            readonly: true
        },
        videoDisplayFormat: {
            type: 'Integer',
            description: 'Video display format (timecode format)',
            readonly: false
        },
        audioDisplayFormat: {
            type: 'Integer',
            description: 'Audio display format (200=Audio Samples, 201=Milliseconds)',
            readonly: false
        }
    },
    methods: {
        clone: {
            returnType: 'Boolean',
            description: 'Creates a duplicate of the sequence',
            signature: 'clone()',
            parameters: []
        },
        close: {
            returnType: 'Boolean',
            description: 'Closes the sequence',
            signature: 'close()',
            parameters: []
        },
        exportAsMediaDirect: {
            returnType: 'Boolean',
            description: 'Renders sequence using specified preset',
            signature: 'exportAsMediaDirect(outputPath, presetPath, workAreaType)',
            parameters: [
                { name: 'outputPath', type: 'String', description: 'Output path for rendered media' },
                { name: 'presetPath', type: 'String', description: 'Path to .epr preset file' },
                { name: 'workAreaType', type: 'Integer', description: '0=entire, 1=in-out, 2=work area' }
            ]
        },
        exportAsProject: {
            returnType: 'Boolean',
            description: 'Creates new project containing only this sequence',
            signature: 'exportAsProject(outputPath)',
            parameters: [
                { name: 'outputPath', type: 'String', description: 'Output path for new project' }
            ]
        },
        exportAsFinalCutProXML: {
            returnType: 'Boolean',
            description: 'Creates FCP XML representation of sequence',
            signature: 'exportAsFinalCutProXML(outputPath)',
            parameters: [
                { name: 'outputPath', type: 'String', description: 'Output path for FCP XML file' }
            ]
        },
        autoReframeSequence: {
            returnType: 'Sequence',
            description: 'Generates new auto-reframed sequence',
            signature: 'autoReframeSequence(numerator, denominator, motionPreset, newName, useNestedSequences)',
            parameters: [
                { name: 'numerator', type: 'Integer', description: 'Numerator of desired aspect ratio' },
                { name: 'denominator', type: 'Integer', description: 'Denominator of desired aspect ratio' },
                { name: 'motionPreset', type: 'String', description: '"slower", "default", or "faster"' },
                { name: 'newName', type: 'String', description: 'Name for new sequence' },
                { name: 'useNestedSequences', type: 'Boolean', description: 'Whether to honor nested sequences' }
            ]
        },
        getInPoint: {
            returnType: 'String',
            description: 'Gets current sequence in point in seconds',
            signature: 'getInPoint()',
            parameters: []
        },
        getInPointAsTime: {
            returnType: 'Time',
            description: 'Gets current sequence in point as Time object',
            signature: 'getInPointAsTime()',
            parameters: []
        },
        getOutPoint: {
            returnType: 'String',
            description: 'Gets current sequence out point in seconds',
            signature: 'getOutPoint()',
            parameters: []
        },
        getOutPointAsTime: {
            returnType: 'Time',
            description: 'Gets current sequence out point as Time object',
            signature: 'getOutPointAsTime()',
            parameters: []
        },
        setInPoint: {
            returnType: 'null',
            description: 'Sets new sequence in point',
            signature: 'setInPoint(time)',
            parameters: [
                { name: 'time', type: 'Number', description: 'New in point time in seconds' }
            ]
        },
        setOutPoint: {
            returnType: 'null',
            description: 'Sets new sequence out point',
            signature: 'setOutPoint(time)',
            parameters: [
                { name: 'time', type: 'Number', description: 'New out point time in seconds' }
            ]
        },
        getPlayerPosition: {
            returnType: 'Time',
            description: 'Gets position of Current Time Indicator',
            signature: 'getPlayerPosition()',
            parameters: []
        },
        setPlayerPosition: {
            returnType: 'Boolean',
            description: 'Sets position of Current Time Indicator',
            signature: 'setPlayerPosition(time)',
            parameters: [
                { name: 'time', type: 'String', description: 'New time in ticks' }
            ]
        },
        getWorkAreaInPoint: {
            returnType: 'String',
            description: 'Gets work area in point in seconds',
            signature: 'getWorkAreaInPoint()',
            parameters: []
        },
        getWorkAreaInPointAsTime: {
            returnType: 'Time',
            description: 'Gets work area in point as Time object',
            signature: 'getWorkAreaInPointAsTime()',
            parameters: []
        },
        getWorkAreaOutPoint: {
            returnType: 'String',
            description: 'Gets work area out point in seconds',
            signature: 'getWorkAreaOutPoint()',
            parameters: []
        },
        getWorkAreaOutPointAsTime: {
            returnType: 'Time',
            description: 'Gets work area out point as Time object',
            signature: 'getWorkAreaOutPointAsTime()',
            parameters: []
        },
        setWorkAreaInPoint: {
            returnType: 'Boolean',
            description: 'Sets work area in point',
            signature: 'setWorkAreaInPoint(time)',
            parameters: [
                { name: 'time', type: 'Number', description: 'New work area in point in seconds' }
            ]
        },
        setWorkAreaOutPoint: {
            returnType: 'Boolean',
            description: 'Sets work area out point',
            signature: 'setWorkAreaOutPoint(time)',
            parameters: [
                { name: 'time', type: 'Number', description: 'New work area out point in seconds' }
            ]
        },
        isWorkAreaEnabled: {
            returnType: 'Boolean',
            description: 'Returns whether work area bar is enabled',
            signature: 'isWorkAreaEnabled()',
            parameters: []
        },
        getSelection: {
            returnType: 'TrackItemCollection',
            description: 'Gets array of selected clips in temporal order',
            signature: 'getSelection()',
            parameters: []
        },
        insertClip: {
            returnType: 'Boolean',
            description: 'Inserts clip at specified time and tracks',
            signature: 'insertClip(projectItem, time, vTrackIndex, aTrackIndex)',
            parameters: [
                { name: 'projectItem', type: 'ProjectItem', description: 'Project item to insert' },
                { name: 'time', type: 'String', description: 'Time to insert at (seconds)' },
                { name: 'vTrackIndex', type: 'Integer', description: 'Zero-based video track index' },
                { name: 'aTrackIndex', type: 'Integer', description: 'Zero-based audio track index' }
            ]
        },
        overwriteClip: {
            returnType: 'Boolean',
            description: 'Overwrites existing clips at specified time',
            signature: 'overwriteClip(projectItem, time, vTrackIndex, aTrackIndex)',
            parameters: [
                { name: 'projectItem', type: 'ProjectItem', description: 'Project item to insert' },
                { name: 'time', type: 'String', description: 'Time to overwrite at (seconds)' },
                { name: 'vTrackIndex', type: 'Integer', description: 'Zero-based video track index' },
                { name: 'aTrackIndex', type: 'Integer', description: 'Zero-based audio track index' }
            ]
        },
        linkSelection: {
            returnType: 'Boolean',
            description: 'Links selected video and audio clips',
            signature: 'linkSelection()',
            parameters: []
        },
        unlinkSelection: {
            returnType: 'Boolean',
            description: 'Unlinks selected video and audio clips',
            signature: 'unlinkSelection()',
            parameters: []
        },
        createSubsequence: {
            returnType: 'Sequence',
            description: 'Creates new sequence from in/out points',
            signature: 'createSubsequence(ignoreTrackTargeting)',
            parameters: [
                { name: 'ignoreTrackTargeting', type: 'Boolean', description: 'Whether to ignore track targeting' }
            ]
        },
        createCaptionTrack: {
            returnType: 'Boolean',
            description: 'Creates caption track using caption data',
            signature: 'createCaptionTrack(projectItem, startAtTime, captionFormat)',
            parameters: [
                { name: 'projectItem', type: 'ProjectItem', description: 'Caption source clip (e.g. .srt)' },
                { name: 'startAtTime', type: 'Float', description: 'Offset in seconds from sequence start' },
                { name: 'captionFormat', type: 'Integer', description: 'Caption format enum value' }
            ]
        },
        importMGT: {
            returnType: 'TrackItem',
            description: 'Imports Motion Graphics Template to sequence',
            signature: 'importMGT(path, time, vidTrackOffset, audTrackOffset)',
            parameters: [
                { name: 'path', type: 'String', description: 'Full path to .mogrt file' },
                { name: 'time', type: 'String', description: 'Time to insert at (ticks)' },
                { name: 'vidTrackOffset', type: 'Integer', description: 'Video track offset from zero' },
                { name: 'audTrackOffset', type: 'Integer', description: 'Audio track offset from zero' }
            ]
        },
        importMGTFromLibrary: {
            returnType: 'TrackItem',
            description: 'Imports MGT from Creative Cloud Libraries',
            signature: 'importMGTFromLibrary(libraryName, mgtName, time, vidTrackOffset, audTrackOffset)',
            parameters: [
                { name: 'libraryName', type: 'String', description: 'Name of CC Library' },
                { name: 'mgtName', type: 'String', description: 'Name of MGT in library' },
                { name: 'time', type: 'String', description: 'Time to insert at (ticks)' },
                { name: 'vidTrackOffset', type: 'Integer', description: 'Video track offset from zero' },
                { name: 'audTrackOffset', type: 'Integer', description: 'Audio track offset from zero' }
            ]
        },
        getSettings: {
            returnType: 'Object',
            description: 'Retrieves sequence settings structure',
            signature: 'getSettings()',
            parameters: []
        },
        setSettings: {
            returnType: 'Boolean',
            description: 'Sets sequence settings',
            signature: 'setSettings(sequenceSettings)',
            parameters: [
                { name: 'sequenceSettings', type: 'Object', description: 'Settings object from getSettings()' }
            ]
        },
        setZeroPoint: {
            returnType: 'Boolean',
            description: 'Sets starting time of sequence',
            signature: 'setZeroPoint(newZeroPoint)',
            parameters: [
                { name: 'newZeroPoint', type: 'String', description: 'New zero point in ticks' }
            ]
        },
        getExportFileExtension: {
            returnType: 'String',
            description: 'Gets file extension for specified output preset',
            signature: 'getExportFileExtension(outputPresetPath)',
            parameters: [
                { name: 'outputPresetPath', type: 'String', description: 'Path to output preset file' }
            ]
        },
        isDoneAnalyzingForVideoEffects: {
            returnType: 'Boolean',
            description: 'Returns whether sequence analysis is complete',
            signature: 'isDoneAnalyzingForVideoEffects()',
            parameters: []
        },
        performSceneEditDetectionOnSelection: {
            returnType: 'Boolean',
            description: 'Performs cut detection on selection',
            signature: 'performSceneEditDetectionOnSelection(actionDesired, applyCutsToLinkedAudio, sensitivity)',
            parameters: [
                { name: 'actionDesired', type: 'String', description: '"CreateMarkers" or "ApplyCuts"' },
                { name: 'applyCutsToLinkedAudio', type: 'Boolean', description: 'Apply cuts to linked audio' },
                { name: 'sensitivity', type: 'String', description: '"LowSensitivity", "MediumSensitivity", "HighSensitivity"' }
            ]
        },
        attachCustomProperty: {
            returnType: 'Boolean',
            description: 'Attaches custom property visible in FCP XML export',
            signature: 'attachCustomProperty(propertyID, propertyValue)',
            parameters: [
                { name: 'propertyID', type: 'String', description: 'ID of custom property' },
                { name: 'propertyValue', type: 'String', description: 'Value of custom property' }
            ]
        }
    }
};

// ProjectItem object definition
EXTENDSCRIPT_API.ProjectItem = {
    type: 'object',
    description: 'Represents items in a project including bins, clips, and sequences',
    properties: {
        name: {
            type: 'String',
            description: 'Name of the project item',
            readonly: false
        },
        nodeId: {
            type: 'String',
            description: 'Unique ID assigned upon addition to project',
            readonly: true
        },
        type: {
            type: 'String',
            description: 'Type of project item: "CLIP", "BIN", "ROOT", or "FILE"',
            readonly: true
        },
        treePath: {
            type: 'String',
            description: 'Current project location of the item',
            readonly: true
        },
        teamProjectsAssetId: {
            type: 'String',
            description: 'Team Projects Asset ID',
            readonly: true
        },
        children: {
            type: 'ProjectItemCollection',
            description: 'Child project items contained within this item',
            readonly: true
        },
        getAudioChannelMapping: {
            type: 'AudioChannelMapping',
            description: 'Audio channel mapping applied to this item',
            readonly: true
        },
        getOverrideColorSpaceList: {
            type: 'Object',
            description: 'Available color space override options',
            readonly: true
        }
    },
    methods: {
        getMediaPath: {
            returnType: 'String',
            description: 'Returns path to associated media file',
            signature: 'getMediaPath()',
            parameters: []
        },
        canChangeMediaPath: {
            returnType: 'Boolean',
            description: 'Returns true if media path can be changed',
            signature: 'canChangeMediaPath()',
            parameters: []
        },
        changeMediaPath: {
            returnType: 'Number',
            description: 'Updates project item to point to new media path',
            signature: 'changeMediaPath(newPath, overrideChecks)',
            parameters: [
                { name: 'newPath', type: 'String', description: 'New path to media file' },
                { name: 'overrideChecks', type: 'Boolean', description: 'Override safety checks' }
            ]
        },
        canProxy: {
            returnType: 'Boolean',
            description: 'Returns true if proxy can be attached',
            signature: 'canProxy()',
            parameters: []
        },
        hasProxy: {
            returnType: 'Boolean',
            description: 'Returns true if proxy is already attached',
            signature: 'hasProxy()',
            parameters: []
        },
        getProxyPath: {
            returnType: 'String',
            description: 'Returns path to proxy media',
            signature: 'getProxyPath()',
            parameters: []
        },
        attachProxy: {
            returnType: 'Number',
            description: 'Attaches media as proxy or hi-res',
            signature: 'attachProxy(mediaPath, isHiRes)',
            parameters: [
                { name: 'mediaPath', type: 'String', description: 'Path to proxy/hi-res media' },
                { name: 'isHiRes', type: 'Integer', description: '0=proxy, 1=hi-res' }
            ]
        },
        getMarkers: {
            returnType: 'MarkerCollection',
            description: 'Gets markers associated with this project item',
            signature: 'getMarkers()',
            parameters: []
        },
        getInPoint: {
            returnType: 'Time',
            description: 'Gets current in point',
            signature: 'getInPoint()',
            parameters: []
        },
        getOutPoint: {
            returnType: 'Time',
            description: 'Gets current out point for specified media type',
            signature: 'getOutPoint(mediaType)',
            parameters: [
                { name: 'mediaType', type: 'Integer', description: '1=video, 2=audio, or omit for all' }
            ]
        },
        setInPoint: {
            returnType: 'Number',
            description: 'Sets in point for specified media types',
            signature: 'setInPoint(time, mediaType)',
            parameters: [
                { name: 'time', type: 'String', description: 'Time in ticks' },
                { name: 'mediaType', type: 'Integer', description: '1=video, 2=audio, 4=all' }
            ]
        },
        setOutPoint: {
            returnType: 'Number',
            description: 'Sets out point for specified media types',
            signature: 'setOutPoint(time, mediaType)',
            parameters: [
                { name: 'time', type: 'String', description: 'Time in ticks' },
                { name: 'mediaType', type: 'Integer', description: '1=video, 2=audio, 4=all' }
            ]
        },
        clearOutPoint: {
            returnType: 'Number',
            description: 'Clears any assigned out point',
            signature: 'clearOutPoint()',
            parameters: []
        },
        startTime: {
            returnType: 'Time',
            description: 'Returns start time as Time object',
            signature: 'startTime()',
            parameters: []
        },
        setStartTime: {
            returnType: 'Number',
            description: 'Sets new start time',
            signature: 'setStartTime(time)',
            parameters: [
                { name: 'time', type: 'String', description: 'Start time in ticks' }
            ]
        },
        isSequence: {
            returnType: 'Boolean',
            description: 'Returns true if item is a sequence',
            signature: 'isSequence()',
            parameters: []
        },
        isMulticamClip: {
            returnType: 'Boolean',
            description: 'Returns true if item is multicam clip',
            signature: 'isMulticamClip()',
            parameters: []
        },
        isMergedClip: {
            returnType: 'Boolean',
            description: 'Returns true if item is merged clip',
            signature: 'isMergedClip()',
            parameters: []
        },
        isOffline: {
            returnType: 'Boolean',
            description: 'Returns true if project item is offline',
            signature: 'isOffline()',
            parameters: []
        },
        setOffline: {
            returnType: 'Boolean',
            description: 'Makes the project item offline',
            signature: 'setOffline()',
            parameters: []
        },
        refreshMedia: {
            returnType: 'Array',
            description: 'Forces update of media representation',
            signature: 'refreshMedia()',
            parameters: []
        },
        getColorLabel: {
            returnType: 'Integer',
            description: 'Gets project item color label (0-15)',
            signature: 'getColorLabel()',
            parameters: []
        },
        setColorLabel: {
            returnType: 'Number',
            description: 'Sets project item color label',
            signature: 'setColorLabel(labelColor)',
            parameters: [
                { name: 'labelColor', type: 'Integer', description: 'Color label index (0-15)' }
            ]
        },
        select: {
            returnType: 'Number',
            description: 'Sets bin as target for subsequent imports',
            signature: 'select()',
            parameters: []
        },
        createBin: {
            returnType: 'ProjectItem',
            description: 'Creates empty bin within this project item',
            signature: 'createBin(name)',
            parameters: [
                { name: 'name', type: 'String', description: 'Name for new bin' }
            ]
        },
        createSmartBin: {
            returnType: 'ProjectItem',
            description: 'Creates search bin with query string',
            signature: 'createSmartBin(name, queryString)',
            parameters: [
                { name: 'name', type: 'String', description: 'Name for new search bin' },
                { name: 'queryString', type: 'String', description: 'Search query string' }
            ]
        },
        deleteBin: {
            returnType: 'Number',
            description: 'Deletes bin and all contents',
            signature: 'deleteBin()',
            parameters: []
        },
        renameBin: {
            returnType: 'Number',
            description: 'Renames bin (only works on bin items)',
            signature: 'renameBin(newName)',
            parameters: [
                { name: 'newName', type: 'String', description: 'New name for bin' }
            ]
        },
        moveBin: {
            returnType: 'Number',
            description: 'Moves project item into new parent bin',
            signature: 'moveBin(newParentBinProjectItem)',
            parameters: [
                { name: 'newParentBinProjectItem', type: 'ProjectItem', description: 'New parent bin' }
            ]
        },
        createSubClip: {
            returnType: 'ProjectItem',
            description: 'Creates sub-clip of existing project item',
            signature: 'createSubClip(name, startTime, endTime, hasHardBoundaries, takeAudio, takeVideo)',
            parameters: [
                { name: 'name', type: 'String', description: 'Name for new sub-clip' },
                { name: 'startTime', type: 'String', description: 'Start time in ticks' },
                { name: 'endTime', type: 'String', description: 'End time in ticks' },
                { name: 'hasHardBoundaries', type: 'Integer', description: '1=user cannot extend in/out' },
                { name: 'takeAudio', type: 'Integer', description: '1=use audio from source' },
                { name: 'takeVideo', type: 'Integer', description: '1=use video from source' }
            ]
        },
        findItemsMatchingMediaPath: {
            returnType: 'Array',
            description: 'Returns array of items referencing same media path',
            signature: 'findItemsMatchingMediaPath(pathToMatch, ignoreSubClips)',
            parameters: [
                { name: 'pathToMatch', type: 'String', description: 'Media path to match' },
                { name: 'ignoreSubClips', type: 'Integer', description: '1=exclude sub-clips from results' }
            ]
        },
        getFootageInterpretation: {
            returnType: 'Object',
            description: 'Returns current interpretation settings',
            signature: 'getFootageInterpretation()',
            parameters: []
        },
        setFootageInterpretation: {
            returnType: 'Boolean',
            description: 'Sets interpretation settings',
            signature: 'setFootageInterpretation(interpretation)',
            parameters: [
                { name: 'interpretation', type: 'Object', description: 'Footage interpretation structure' }
            ]
        },
        setOverrideFrameRate: {
            returnType: 'Number',
            description: 'Sets frame rate override',
            signature: 'setOverrideFrameRate(newFrameRate)',
            parameters: [
                { name: 'newFrameRate', type: 'Float', description: 'New frame rate' }
            ]
        },
        setOverridePixelAspectRatio: {
            returnType: 'Number',
            description: 'Sets pixel aspect ratio override',
            signature: 'setOverridePixelAspectRatio(numerator, denominator)',
            parameters: [
                { name: 'numerator', type: 'Integer', description: 'Aspect ratio numerator' },
                { name: 'denominator', type: 'Integer', description: 'Aspect ratio denominator' }
            ]
        },
        setScaleToFrameSize: {
            returnType: 'undefined',
            description: 'Enables scale to frame size for sequence insertion',
            signature: 'setScaleToFrameSize()',
            parameters: []
        },
        getProjectMetadata: {
            returnType: 'String',
            description: 'Gets Premiere Pro private project metadata',
            signature: 'getProjectMetadata()',
            parameters: []
        },
        setProjectMetadata: {
            returnType: 'Number',
            description: 'Sets private project metadata',
            signature: 'setProjectMetadata(newMetadata, updatedFields)',
            parameters: [
                { name: 'newMetadata', type: 'String', description: 'Serialized metadata' },
                { name: 'updatedFields', type: 'Array', description: 'Array of field names to update' }
            ]
        },
        getProjectColumnsMetadata: {
            returnType: 'String',
            description: 'Returns JSON string with all metadata from current project view',
            signature: 'getProjectColumnsMetadata()',
            parameters: []
        },
        getXMPMetadata: {
            returnType: 'String',
            description: 'Gets XMP metadata as serialized string',
            signature: 'getXMPMetadata()',
            parameters: []
        },
        setXMPMetadata: {
            returnType: 'Number',
            description: 'Sets XMP metadata',
            signature: 'setXMPMetadata(newXMP)',
            parameters: [
                { name: 'newXMP', type: 'String', description: 'Serialized XMP metadata' }
            ]
        },
        getColorSpace: {
            returnType: 'Object',
            description: 'Gets color space properties',
            signature: 'getColorSpace()',
            parameters: []
        },
        getOriginalColorSpace: {
            returnType: 'Object',
            description: 'Gets original color space properties',
            signature: 'getOriginalColorSpace()',
            parameters: []
        },
        getEmbeddedLUTID: {
            returnType: 'String',
            description: 'Gets embedded LUT ID',
            signature: 'getEmbeddedLUTID()',
            parameters: []
        },
        getInputLUTID: {
            returnType: 'String',
            description: 'Gets input LUT ID',
            signature: 'getInputLUTID()',
            parameters: []
        },
        videoComponents: {
            returnType: 'ComponentCollection',
            description: 'Video components for master clip of this item',
            signature: 'videoComponents()',
            parameters: []
        }
    }
};

// TrackItem object definition
EXTENDSCRIPT_API.TrackItem = {
    type: 'object',
    description: 'Represents an item on a video or audio track within a sequence',
    properties: {
        name: {
            type: 'String',
            description: 'Name of the track item',
            readonly: false
        },
        matchName: {
            type: 'String',
            description: 'Match name of the track item',
            readonly: true
        },
        nodeId: {
            type: 'String',
            description: 'Node ID of the track item',
            readonly: true
        },
        mediaType: {
            type: 'String',
            description: 'Media type: "Audio" or "Video"',
            readonly: true
        },
        type: {
            type: 'Number',
            description: 'Type of media: 1=video, 2=audio',
            readonly: true
        },
        projectItem: {
            type: 'ProjectItem',
            description: 'ProjectItem from which media is drawn',
            readonly: true
        },
        start: {
            type: 'Time',
            description: 'Visible start time in sequence',
            readonly: false
        },
        end: {
            type: 'Time',
            description: 'Visible end time in sequence',
            readonly: false
        },
        inPoint: {
            type: 'Time',
            description: 'In point set on source',
            readonly: false
        },
        outPoint: {
            type: 'Time',
            description: 'Out point set on source',
            readonly: false
        },
        duration: {
            type: 'Time',
            description: 'Duration of the track item',
            readonly: true
        },
        components: {
            type: 'ComponentCollection',
            description: 'Components associated with this track item',
            readonly: true
        },
        disabled: {
            type: 'Boolean',
            description: 'Disabled state of the track item',
            readonly: false
        }
    },
    methods: {
        getSpeed: {
            returnType: 'Float',
            description: 'Returns speed multiplier applied to track item',
            signature: 'getSpeed()',
            parameters: []
        },
        isSpeedReversed: {
            returnType: 'Number',
            description: 'Returns 1 if track item is reversed, 0 if not',
            signature: 'isSpeedReversed()',
            parameters: []
        },
        isAdjustmentLayer: {
            returnType: 'Boolean',
            description: 'Returns true if track item is adjustment layer',
            signature: 'isAdjustmentLayer()',
            parameters: []
        },
        isSelected: {
            returnType: 'Boolean',
            description: 'Returns true if track item is selected',
            signature: 'isSelected()',
            parameters: []
        },
        setSelected: {
            returnType: 'Number',
            description: 'Sets selection state of track item',
            signature: 'setSelected(state, updateUI)',
            parameters: [
                { name: 'state', type: 'Integer', description: '1=select, 0=deselect' },
                { name: 'updateUI', type: 'Integer', description: '1=update UI after change' }
            ]
        },
        getMatchName: {
            returnType: 'String',
            description: 'Retrieves match name for track item',
            signature: 'getMatchName()',
            parameters: []
        },
        remove: {
            returnType: 'Number',
            description: 'Removes track item from sequence',
            signature: 'remove(inRipple, inAlignToVideo)',
            parameters: [
                { name: 'inRipple', type: 'Boolean', description: '1=ripple later items, 0=leave gap' },
                { name: 'inAlignToVideo', type: 'Boolean', description: '1=align to video frames' }
            ]
        },
        move: {
            returnType: 'Number',
            description: 'Moves track item to new time position',
            signature: 'move(newInPoint)',
            parameters: [
                { name: 'newInPoint', type: 'Time', description: 'New start time for track item' }
            ]
        },
        getMGTComponent: {
            returnType: 'Component',
            description: 'Adds Motion Graphics Template to track',
            signature: 'getMGTComponent(mogrtPath, targetTime, vidTrackOffset, audTrackOffset)',
            parameters: [
                { name: 'mogrtPath', type: 'String', description: 'Full path to .mogrt file' },
                { name: 'targetTime', type: 'String', description: 'Time to insert at (ticks)' },
                { name: 'vidTrackOffset', type: 'Integer', description: 'Video track offset from 0' },
                { name: 'audTrackOffset', type: 'Integer', description: 'Audio track offset from 0' }
            ]
        }
    }
};

// MarkerCollection object definition
EXTENDSCRIPT_API.MarkerCollection = {
    type: 'object',
    description: 'Collection of Marker objects in ProjectItem or Sequence',
    properties: {
        numMarkers: {
            type: 'Integer',
            description: 'Number of markers in the collection',
            readonly: true
        }
    },
    methods: {
        createMarker: {
            returnType: 'Marker',
            description: 'Creates new marker at specified time',
            signature: 'createMarker(time)',
            parameters: [
                { name: 'time', type: 'Float', description: 'Time in seconds where marker should be created' }
            ]
        },
        deleteMarker: {
            returnType: 'Boolean',
            description: 'Removes specified marker from collection',
            signature: 'deleteMarker(marker)',
            parameters: [
                { name: 'marker', type: 'Marker', description: 'Marker object to remove' }
            ]
        },
        getFirstMarker: {
            returnType: 'Marker',
            description: 'Gets first marker sorted by time',
            signature: 'getFirstMarker()',
            parameters: []
        },
        getLastMarker: {
            returnType: 'Marker',
            description: 'Gets last marker sorted by time',
            signature: 'getLastMarker()',
            parameters: []
        },
        getNextMarker: {
            returnType: 'Marker',
            description: 'Gets next marker after specified marker',
            signature: 'getNextMarker(currentMarker)',
            parameters: [
                { name: 'currentMarker', type: 'Marker', description: 'Starting marker to find next from' }
            ]
        },
        getPrevMarker: {
            returnType: 'Marker',
            description: 'Gets previous marker before specified marker',
            signature: 'getPrevMarker(currentMarker)',
            parameters: [
                { name: 'currentMarker', type: 'Marker', description: 'Starting marker to find previous from' }
            ]
        }
    }
};

// Marker object definition
EXTENDSCRIPT_API.Marker = {
    type: 'object',
    description: 'Represents markers associated with ProjectItems and Sequences',
    properties: {
        name: {
            type: 'String',
            description: 'Name of the marker',
            readonly: false
        },
        comments: {
            type: 'String',
            description: 'Comments within the marker',
            readonly: false
        },
        guid: {
            type: 'String',
            description: 'Unique identifier created at instantiation',
            readonly: true
        },
        start: {
            type: 'Time',
            description: 'Beginning time of the marker',
            readonly: false
        },
        end: {
            type: 'Time',
            description: 'Ending time of the marker',
            readonly: false
        },
        type: {
            type: 'String',
            description: 'Type of marker: "Comment", "Chapter", "Segmentation", or "WebLink"',
            readonly: true
        }
    },
    methods: {
        getColorByIndex: {
            returnType: 'Integer',
            description: 'Gets marker color index',
            signature: 'getColorByIndex(index)',
            parameters: [
                { name: 'index', type: 'Integer', description: 'Index of marker to read' }
            ]
        },
        setColorByIndex: {
            returnType: 'undefined',
            description: 'Sets marker color by index (0=Green, 1=Red, 2=Purple, etc.)',
            signature: 'setColorByIndex(colorIndex, markerIndex)',
            parameters: [
                { name: 'colorIndex', type: 'Integer', description: 'Color index to apply (0-7)' },
                { name: 'markerIndex', type: 'Integer', description: 'Index of marker to modify' }
            ]
        },
        setTypeAsChapter: {
            returnType: 'Number',
            description: 'Sets marker type to Chapter',
            signature: 'setTypeAsChapter()',
            parameters: []
        },
        setTypeAsComment: {
            returnType: 'Number',
            description: 'Sets marker type to Comment',
            signature: 'setTypeAsComment()',
            parameters: []
        },
        setTypeAsSegmentation: {
            returnType: 'Number',
            description: 'Sets marker type to Segmentation',
            signature: 'setTypeAsSegmentation()',
            parameters: []
        },
        setTypeAsWebLink: {
            returnType: 'Number',
            description: 'Sets marker type to WebLink',
            signature: 'setTypeAsWebLink()',
            parameters: []
        },
        getWebLinkURL: {
            returnType: 'String',
            description: 'Gets URL from marker WebLink field',
            signature: 'getWebLinkURL()',
            parameters: []
        },
        getWebLinkFrameTarget: {
            returnType: 'String',
            description: 'Gets frame target from marker FrameTarget field',
            signature: 'getWebLinkFrameTarget()',
            parameters: []
        }
    }
};

// TrackCollection object definition
EXTENDSCRIPT_API.TrackCollection = {
    type: 'object',
    description: 'Collection of Track objects in a sequence',
    properties: {
        numTracks: {
            type: 'Integer',
            description: 'Number of tracks in the sequence',
            readonly: true
        }
    }
};

// Track object definition
EXTENDSCRIPT_API.Track = {
    type: 'object',
    description: 'Represents a video or audio track within a sequence',
    properties: {
        name: {
            type: 'String',
            description: 'Name of the track',
            readonly: true
        },
        id: {
            type: 'Integer',
            description: 'Ordinal assigned to track upon creation',
            readonly: true
        },
        mediaType: {
            type: 'String',
            description: 'Type of media in track: "Audio" or "Video"',
            readonly: true
        },
        clips: {
            type: 'TrackItemCollection',
            description: 'Collection of track items in temporal order',
            readonly: true
        },
        transitions: {
            type: 'TrackItemCollection',
            description: 'Collection of transitions in temporal order',
            readonly: true
        }
    },
    methods: {
        insertClip: {
            returnType: 'void',
            description: 'Inserts clip at specified time (media inserted)',
            signature: 'insertClip(projectItem, time, vTrackIndex, aTrackIndex)',
            parameters: [
                { name: 'projectItem', type: 'ProjectItem', description: 'Project item to insert' },
                { name: 'time', type: 'String', description: 'Time to insert at (ticks)' },
                { name: 'vTrackIndex', type: 'Integer', description: 'Video track index' },
                { name: 'aTrackIndex', type: 'Integer', description: 'Audio track index' }
            ]
        },
        overwriteClip: {
            returnType: 'Boolean',
            description: 'Overwrites existing media at specified time',
            signature: 'overwriteClip(projectItem, time)',
            parameters: [
                { name: 'projectItem', type: 'ProjectItem', description: 'Project item to insert' },
                { name: 'time', type: 'String', description: 'Time to overwrite at (ticks)' }
            ]
        },
        isMuted: {
            returnType: 'Boolean',
            description: 'Returns true if track is currently muted',
            signature: 'isMuted()',
            parameters: []
        },
        setMute: {
            returnType: 'Number',
            description: 'Sets mute state of track',
            signature: 'setMute(isMuted)',
            parameters: [
                { name: 'isMuted', type: 'Integer', description: '1=mute track, 0=unmute track' }
            ]
        }
    }
};

// Collection base types
EXTENDSCRIPT_API.Collection = {
    type: 'object',
    description: 'Base class for collection objects',
    properties: {
        length: {
            type: 'Integer',
            description: 'Number of objects in the collection',
            readonly: true
        }
    }
};

EXTENDSCRIPT_API.ProjectItemCollection = {
    type: 'object',
    description: 'Collection of ProjectItem objects',
    properties: {
        numItems: {
            type: 'Integer',
            description: 'Total number of items in active project',
            readonly: true
        }
    }
};

EXTENDSCRIPT_API.SequenceCollection = {
    type: 'object',
    description: 'Collection of Sequence objects in active project',
    properties: {
        numSequences: {
            type: 'Integer',
            description: 'Total number of sequences in active project',
            readonly: true
        }
    }
};

EXTENDSCRIPT_API.TrackItemCollection = {
    type: 'object',
    description: 'Collection of TrackItem objects on a track',
    properties: {
        numItems: {
            type: 'Integer',
            description: 'Total number of clips on a track',
            readonly: true
        }
    }
};

EXTENDSCRIPT_API.ComponentCollection = {
    type: 'object',
    description: 'Collection of Component objects',
    properties: {
        numItems: {
            type: 'Integer',
            description: 'Number of items in ComponentCollection',
            readonly: true
        }
    }
};

// Time object definition
EXTENDSCRIPT_API.Time = {
    type: 'object',
    description: 'Represents a time value in ticks and seconds',
    properties: {
        seconds: {
            type: 'Number',
            description: 'Time value in seconds',
            readonly: false
        },
        ticks: {
            type: 'String',
            description: 'Time value in ticks (254016000000 ticks per second)',
            readonly: false
        }
    },
    methods: {
        getFormatted: {
            returnType: 'String',
            description: 'Returns formatted time string in specified display format',
            signature: 'getFormatted(frameRate, displayFormat)',
            parameters: [
                { name: 'frameRate', type: 'Time', description: 'Time object with single frame duration' },
                { name: 'displayFormat', type: 'Integer', description: 'Display format constant (100-113, 200-201)' }
            ]
        },
        setSecondsAsFraction: {
            returnType: 'Boolean',
            description: 'Sets time as result of numerator/denominator division',
            signature: 'setSecondsAsFraction(numerator, denominator)',
            parameters: [
                { name: 'numerator', type: 'Integer', description: 'Fraction numerator' },
                { name: 'denominator', type: 'Integer', description: 'Fraction denominator' }
            ]
        }
    }
};

// Component and ComponentParam objects
EXTENDSCRIPT_API.Component = {
    type: 'object',
    description: 'Represents something added/applied to a TrackItem (effects, etc.)',
    properties: {
        displayName: {
            type: 'String',
            description: 'Localized name as displayed to user',
            readonly: true
        },
        matchName: {
            type: 'String',
            description: 'Name used to uniquely identify effect plugins',
            readonly: true
        },
        properties: {
            type: 'ComponentParamCollection',
            description: 'Effect parameters and properties',
            readonly: true
        }
    }
};

EXTENDSCRIPT_API.ComponentParam = {
    type: 'object',
    description: 'Represents a parameter associated with a component',
    properties: {
        displayName: {
            type: 'String',
            description: 'Localized parameter name as displayed to user',
            readonly: true
        }
    },
    methods: {
        getValue: {
            returnType: 'Any',
            description: 'Gets value of non-time-variant parameter',
            signature: 'getValue()',
            parameters: []
        },
        setValue: {
            returnType: 'Number',
            description: 'Sets value of non-time-variant parameter',
            signature: 'setValue(value, updateUI)',
            parameters: [
                { name: 'value', type: 'Any', description: 'Value appropriate for parameter type' },
                { name: 'updateUI', type: 'Integer', description: '1=force UI update after setting' }
            ]
        },
        getValueAtTime: {
            returnType: 'Any',
            description: 'Gets interpolated value at specified time',
            signature: 'getValueAtTime(time)',
            parameters: [
                { name: 'time', type: 'Time', description: 'Time to get value from' }
            ]
        },
        getValueAtKey: {
            returnType: 'Any',
            description: 'Gets value at specified keyframe time',
            signature: 'getValueAtKey(time)',
            parameters: [
                { name: 'time', type: 'Time', description: 'Keyframe time to get value from' }
            ]
        },
        setValueAtKey: {
            returnType: 'Number',
            description: 'Sets value at specified keyframe time',
            signature: 'setValueAtKey(time, value, updateUI)',
            parameters: [
                { name: 'time', type: 'Time', description: 'Keyframe time to set' },
                { name: 'value', type: 'Any', description: 'Value to set' },
                { name: 'updateUI', type: 'Integer', description: '1=force UI update' }
            ]
        },
        addKey: {
            returnType: 'Number',
            description: 'Adds keyframe at specified time',
            signature: 'addKey(time)',
            parameters: [
                { name: 'time', type: 'Time', description: 'Time to add keyframe' }
            ]
        },
        removeKey: {
            returnType: 'Number',
            description: 'Removes keyframe at specified time',
            signature: 'removeKey(time)',
            parameters: [
                { name: 'time', type: 'Time', description: 'Time to remove keyframe' }
            ]
        },
        removeKeyRange: {
            returnType: 'Number',
            description: 'Removes all keyframes in time range',
            signature: 'removeKeyRange(startTime, endTime)',
            parameters: [
                { name: 'startTime', type: 'Time', description: 'Start of removal range' },
                { name: 'endTime', type: 'Time', description: 'End of removal range' }
            ]
        },
        getKeys: {
            returnType: 'Array',
            description: 'Returns array of all keyframe times',
            signature: 'getKeys()',
            parameters: []
        },
        areKeyframesSupported: {
            returnType: 'Boolean',
            description: 'Returns true if parameter supports keyframes',
            signature: 'areKeyframesSupported()',
            parameters: []
        },
        isTimeVarying: {
            returnType: 'Boolean',
            description: 'Returns true if parameter varies over time',
            signature: 'isTimeVarying()',
            parameters: []
        },
        setTimeVarying: {
            returnType: 'Number',
            description: 'Sets whether parameter varies over time',
            signature: 'setTimeVarying(varying)',
            parameters: [
                { name: 'varying', type: 'Boolean', description: 'True=vary over time, false=constant' }
            ]
        },
        findNearestKey: {
            returnType: 'Time',
            description: 'Finds nearest keyframe within threshold',
            signature: 'findNearestKey(timeToCheck, threshold)',
            parameters: [
                { name: 'timeToCheck', type: 'Time', description: 'Time to search from' },
                { name: 'threshold', type: 'Integer', description: 'Search distance in ticks' }
            ]
        },
        findNextKey: {
            returnType: 'Time',
            description: 'Finds next keyframe after specified time',
            signature: 'findNextKey(timeToCheck)',
            parameters: [
                { name: 'timeToCheck', type: 'Time', description: 'Time to search from' }
            ]
        },
        findPreviousKey: {
            returnType: 'Time',
            description: 'Finds previous keyframe before specified time',
            signature: 'findPreviousKey(timeToCheck)',
            parameters: [
                { name: 'timeToCheck', type: 'Time', description: 'Time to search from' }
            ]
        },
        setInterpolationTypeAtKey: {
            returnType: 'Number',
            description: 'Sets interpolation type for keyframe',
            signature: 'setInterpolationTypeAtKey(time, interpolationType, updateUI)',
            parameters: [
                { name: 'time', type: 'Time', description: 'Keyframe time to modify' },
                { name: 'interpolationType', type: 'Integer', description: 'Interpolation type enum (0-8)' },
                { name: 'updateUI', type: 'Boolean', description: 'Whether to update UI' }
            ]
        },
        getColorValue: {
            returnType: 'Color',
            description: 'Gets color value from parameter stream',
            signature: 'getColorValue()',
            parameters: []
        },
        setColorValue: {
            returnType: 'Number',
            description: 'Sets RGBA color values in parameter stream',
            signature: 'setColorValue(alpha, red, green, blue, updateUI)',
            parameters: [
                { name: 'alpha', type: 'Integer', description: 'Alpha value' },
                { name: 'red', type: 'Integer', description: 'Red value' },
                { name: 'green', type: 'Integer', description: 'Green value' },
                { name: 'blue', type: 'Integer', description: 'Blue value' },
                { name: 'updateUI', type: 'Integer', description: '1=force UI update' }
            ]
        }
    }
};

// Enhanced Constants and Enums
const EXTENDSCRIPT_CONSTANTS = {
    ProjectItemType: {
        CLIP: 1,
        BIN: 2,
        ROOT: 3,
        FILE: 4
    },
    ScratchDiskType: {
        FirstVideoCaptureFolder: 1,
        FirstAudioCaptureFolder: 2,
        FirstVideoPreviewFolder: 3,
        FirstAudioPreviewFolder: 4,
        FirstAutoSaveFolder: 5,
        FirstCCLibrariesFolder: 6,
        FirstCapsuleMediaFolder: 7
    },
    VideoDisplayFormat: {
        TIMEDISPLAY_24Timecode: 100,
        TIMEDISPLAY_25Timecode: 101,
        TIMEDISPLAY_2997DropTimecode: 102,
        TIMEDISPLAY_2997NonDropTimecode: 103,
        TIMEDISPLAY_30Timecode: 104,
        TIMEDISPLAY_50Timecode: 105,
        TIMEDISPLAY_5994DropTimecode: 106,
        TIMEDISPLAY_5994NonDropTimecode: 107,
        TIMEDISPLAY_60Timecode: 108,
        TIMEDISPLAY_Frames: 109,
        TIMEDISPLAY_23976Timecode: 110,
        TIMEDISPLAY_16mmFeetFrames: 111,
        TIMEDISPLAY_35mmFeetFrames: 112,
        TIMEDISPLAY_48Timecode: 113
    },
    AudioDisplayFormat: {
        TIMEDISPLAY_AudioSamplesTimecode: 200,
        TIMEDISPLAY_AudioMsTimecode: 201
    },
    WorkAreaType: {
        ENCODE_ENTIRE: 0,
        ENCODE_IN_TO_OUT: 1,
        ENCODE_WORK_AREA: 2
    },
    ColorLabelIndex: {
        Violet: 0, Iris: 1, Caribbean: 2, Lavender: 3, Cerulean: 4, Forest: 5,
        Rose: 6, Mango: 7, Purple: 8, Blue: 9, Teal: 10, Magenta: 11,
        Tan: 12, Green: 13, Brown: 14, Yellow: 15
    },
    MarkerColorIndex: {
        Green: 0, Red: 1, Purple: 2, Orange: 3, Yellow: 4, White: 5, Blue: 6, Cyan: 7
    },
    SequenceCaptionFormat: {
        CAPTION_FORMAT_SUBTITLE: 0,
        CAPTION_FORMAT_608: 1,
        CAPTION_FORMAT_708: 2,
        CAPTION_FORMAT_TELETEXT: 3,
        CAPTION_FORMAT_OPEN_EBU: 4,
        CAPTION_FORMAT_OP42: 5,
        CAPTION_FORMAT_OP47: 6
    },
    AlphaChannelType: {
        ALPHACHANNEL_NONE: 0,
        ALPHACHANNEL_STRAIGHT: 1,
        ALPHACHANNEL_PREMULTIPLIED: 2,
        ALPHACHANNEL_IGNORE: 3
    },
    FieldType: {
        FIELDTYPE_DEFAULT: -1,
        FIELDTYPE_PROGRESSIVE: 0,
        FIELDTYPE_UPPERFIRST: 1,
        FIELDTYPE_LOWERFIRST: 2
    },
    VRProjection: {
        VR_CONFORM_PROJECTION_NONE: 0,
        VR_CONFORM_PROJECTION_EQUIRECTANGULAR: 1
    },
    VRLayout: {
        VR_LAYOUT_MONOSCOPIC: 0,
        VR_LAYOUT_STEREO_OVER_UNDER: 1,
        VR_LAYOUT_STEREO_SIDE_BY_SIDE: 2
    },
    AudioChannelType: {
        AUDIOCHANNELTYPE_Mono: 0,
        AUDIOCHANNELTYPE_Stereo: 1,
        AUDIOCHANNELTYPE_51: 2
    },
    InterpolationType: {
        KF_Interp_Mode_Linear: 0,
        kfInterpMode_EaseIn_Obsolete: 1,
        kfInterpMode_EaseOut_Obsolete: 2,
        kfInterpMode_EaseInEaseOut_Obsolete: 3,
        KF_Interp_Mode_Hold: 4,
        KF_Interp_Mode_Bezier: 5,
        KF_Interp_Mode_Time: 6,
        kfInterpMode_TimeTransitionStart: 7,
        kfInterpMode_TimeTransitionEnd: 8
    }
};

// Export for use in autocomplete system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXTENDSCRIPT_API, EXTENDSCRIPT_CONSTANTS };
} else {
    window.EXTENDSCRIPT_API = EXTENDSCRIPT_API;
    window.EXTENDSCRIPT_CONSTANTS = EXTENDSCRIPT_CONSTANTS;
}