// client/extendscript-api.js
// ExtendScript API data structure for Premiere Pro
const EXTENDSCRIPT_API = {
    app: {
        type: 'object',
        description: 'The global application object',
        properties: {
            project: {
                type: 'Project',
                description: 'The currently active project',
                properties: {
                    activeSequence: {
                        type: 'Sequence',
                        description: 'The currently active sequence',
                        properties: {
                            markers: {
                                type: 'MarkerCollection',
                                description: 'Collection of markers in the sequence',
                                methods: {
                                    getFirstMarker: {
                                        returnType: 'Marker',
                                        description: 'Gets the first marker in the sequence',
                                        signature: 'getFirstMarker()'
                                    },
                                    getNextMarker: {
                                        returnType: 'Marker',
                                        description: 'Gets the next marker after the specified marker',
                                        signature: 'getNextMarker(marker)',
                                        parameters: ['marker']
                                    },
                                    createMarker: {
                                        returnType: 'Marker',
                                        description: 'Creates a new marker',
                                        signature: 'createMarker(time)',
                                        parameters: ['time']
                                    },
                                    deleteMarker: {
                                        returnType: 'Boolean',
                                        description: 'Deletes the specified marker',
                                        signature: 'deleteMarker(marker)',
                                        parameters: ['marker']
                                    }
                                },
                                properties: {
                                    numMarkers: {
                                        type: 'Number',
                                        description: 'Number of markers in the sequence',
                                        readonly: true
                                    }
                                }
                            },
                            videoTracks: {
                                type: 'TrackCollection',
                                description: 'Collection of video tracks',
                                properties: {
                                    numTracks: {
                                        type: 'Number',
                                        description: 'Number of video tracks',
                                        readonly: true
                                    }
                                }
                            },
                            audioTracks: {
                                type: 'TrackCollection',
                                description: 'Collection of audio tracks'
                            }
                        },
                        methods: {
                            getVideoTracks: {
                                returnType: 'TrackCollection',
                                description: 'Gets all video tracks',
                                signature: 'getVideoTracks()'
                            },
                            getAudioTracks: {
                                returnType: 'TrackCollection',
                                description: 'Gets all audio tracks',
                                signature: 'getAudioTracks()'
                            }
                        }
                    },
                    rootItem: {
                        type: 'ProjectItem',
                        description: 'Root project item containing all project content',
                        properties: {
                            children: {
                                type: 'ProjectItemCollection',
                                description: 'Child project items',
                                properties: {
                                    numItems: {
                                        type: 'Number',
                                        description: 'Number of child items',
                                        readonly: true
                                    }
                                }
                            },
                            name: {
                                type: 'String',
                                description: 'Name of the project item'
                            },
                            type: {
                                type: 'Number',
                                description: 'Type of project item',
                                readonly: true
                            }
                        },
                        methods: {
                            getMarkers: {
                                returnType: 'MarkerCollection',
                                description: 'Gets markers for this project item',
                                signature: 'getMarkers()'
                            }
                        }
                    },
                    sequences: {
                        type: 'SequenceCollection',
                        description: 'Collection of sequences in the project',
                        properties: {
                            numSequences: {
                                type: 'Number',
                                description: 'Number of sequences',
                                readonly: true
                            }
                        }
                    },
                    name: {
                        type: 'String',
                        description: 'Name of the project',
                        readonly: true
                    },
                    path: {
                        type: 'String',
                        description: 'File path of the project',
                        readonly: true
                    }
                },
                methods: {
                    save: {
                        returnType: 'Number',
                        description: 'Saves the project',
                        signature: 'save()'
                    },
                    saveAs: {
                        returnType: 'Number',
                        description: 'Saves the project to a new location',
                        signature: 'saveAs(path)',
                        parameters: ['path']
                    },
                    importFiles: {
                        returnType: 'Boolean',
                        description: 'Imports files into the project',
                        signature: 'importFiles(filePaths, suppressUI, targetBin, importAsNumberedStills)',
                        parameters: ['filePaths', 'suppressUI', 'targetBin', 'importAsNumberedStills']
                    },
                    newSequence: {
                        returnType: 'Sequence',
                        description: 'Creates a new sequence',
                        signature: 'newSequence(name, pathToSequencePreset)',
                        parameters: ['name', 'pathToSequencePreset']
                    },
                    createNewSequence: {
                        returnType: 'Sequence',
                        description: 'Creates a new sequence with specified ID',
                        signature: 'createNewSequence(sequenceName, sequenceID)',
                        parameters: ['sequenceName', 'sequenceID']
                    },
                    exportAAF: {
                        returnType: 'Number',
                        description: 'Exports an AAF file',
                        signature: 'exportAAF(sequenceToExport, outputPath, mixdownVideo, explodeToMono, sampleRate, bitsPerSample, embedAudio, audioFileFormat, trimSources, handleFrames, presetPath, renderAudioEffects, includeClipCopies, preserveParentFolder)',
                        parameters: ['sequenceToExport', 'outputPath', 'mixdownVideo', 'explodeToMono', 'sampleRate', 'bitsPerSample', 'embedAudio', 'audioFileFormat', 'trimSources', 'handleFrames', 'presetPath', 'renderAudioEffects', 'includeClipCopies', 'preserveParentFolder']
                    }
                }
            },
            encoder: {
                type: 'Encoder',
                description: 'Adobe Media Encoder interface',
                methods: {
                    encodeSequence: {
                        returnType: 'String',
                        description: 'Encodes a sequence using Adobe Media Encoder',
                        signature: 'encodeSequence(sequence, outputPath, presetPath, workArea, removeUponCompletion)',
                        parameters: ['sequence', 'outputPath', 'presetPath', 'workArea', 'removeUponCompletion']
                    },
                    encodeFile: {
                        returnType: 'String',
                        description: 'Encodes a file using Adobe Media Encoder',
                        signature: 'encodeFile(filePath, outputPath, presetPath, workArea, removeUponCompletion, inPoint, outPoint)',
                        parameters: ['filePath', 'outputPath', 'presetPath', 'workArea', 'removeUponCompletion', 'inPoint', 'outPoint']
                    },
                    launchEncoder: {
                        returnType: 'Number',
                        description: 'Launches Adobe Media Encoder',
                        signature: 'launchEncoder()'
                    },
                    startBatch: {
                        returnType: 'Number',
                        description: 'Starts the render queue in Adobe Media Encoder',
                        signature: 'startBatch()'
                    }
                }
            },
            anywhere: {
                type: 'Anywhere',
                description: 'Adobe Anywhere or Team Projects interface',
                methods: {
                    getAuthenticationToken: {
                        returnType: 'String',
                        description: 'Retrieves an authentication token',
                        signature: 'getAuthenticationToken()'
                    },
                    getCurrentEditingSessionActiveSequenceURL: {
                        returnType: 'String',
                        description: 'Gets URL of currently active sequence in production',
                        signature: 'getCurrentEditingSessionActiveSequenceURL()'
                    },
                    isProductionOpen: {
                        returnType: 'Boolean',
                        description: 'Checks if a production is currently open',
                        signature: 'isProductionOpen()'
                    },
                    listProductions: {
                        returnType: 'Array',
                        description: 'Lists available productions',
                        signature: 'listProductions()'
                    },
                    openProduction: {
                        returnType: 'Number',
                        description: 'Opens a production',
                        signature: 'openProduction(productionURL)',
                        parameters: ['productionURL']
                    }
                }
            },
            metadata: {
                type: 'Metadata',
                description: 'Metadata manipulation interface',
                methods: {
                    addMarker: {
                        returnType: 'Boolean',
                        description: 'Adds a marker',
                        signature: 'addMarker()'
                    },
                    deleteMarker: {
                        returnType: 'Boolean',
                        description: 'Deletes a marker',
                        signature: 'deleteMarker()'
                    },
                    setMarkerData: {
                        returnType: 'Boolean',
                        description: 'Sets marker data',
                        signature: 'setMarkerData()'
                    },
                    setMetadataValue: {
                        returnType: 'Boolean',
                        description: 'Sets a metadata value',
                        signature: 'setMetadataValue()'
                    }
                }
            },
            production: {
                type: 'Production',
                description: 'Production management interface',
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
                        description: 'Projects in the production'
                    }
                },
                methods: {
                    addProject: {
                        returnType: 'Boolean',
                        description: 'Adds a project to the production',
                        signature: 'addProject(srcProjectPath, destProjectPath)',
                        parameters: ['srcProjectPath', 'destProjectPath']
                    },
                    close: {
                        returnType: 'Boolean',
                        description: 'Closes the production',
                        signature: 'close()'
                    },
                    moveToTrash: {
                        returnType: 'Boolean',
                        description: 'Moves item to trash',
                        signature: 'moveToTrash(projectOrFolderPath, suppressUI, saveProject)',
                        parameters: ['projectOrFolderPath', 'suppressUI', 'saveProject']
                    }
                }
            },
            properties: {
                type: 'Properties',
                description: 'Application properties interface',
                methods: {
                    getProperty: {
                        returnType: 'String',
                        description: 'Gets a property value',
                        signature: 'getProperty(property)',
                        parameters: ['property']
                    },
                    setProperty: {
                        returnType: 'null',
                        description: 'Sets a property value',
                        signature: 'setProperty(property, value, persistent, createIfNotExist)',
                        parameters: ['property', 'value', 'persistent', 'createIfNotExist']
                    },
                    doesPropertyExist: {
                        returnType: 'Boolean',
                        description: 'Checks if a property exists',
                        signature: 'doesPropertyExist(property)',
                        parameters: ['property']
                    },
                    clearProperty: {
                        returnType: 'Boolean',
                        description: 'Clears a property',
                        signature: 'clearProperty()'
                    },
                    isPropertyReadOnly: {
                        returnType: 'Boolean',
                        description: 'Checks if property is read-only',
                        signature: 'isPropertyReadOnly(property)',
                        parameters: ['property']
                    }
                }
            },
            sourceMonitor: {
                type: 'SourceMonitor',
                description: 'Source monitor interface',
                methods: {
                    closeAllClips: {
                        returnType: 'Number',
                        description: 'Closes all clips in source monitor',
                        signature: 'closeAllClips()'
                    },
                    closeClip: {
                        returnType: 'Number',
                        description: 'Closes the front-most clip',
                        signature: 'closeClip()'
                    },
                    getPosition: {
                        returnType: 'Time',
                        description: 'Gets current time indicator position',
                        signature: 'getPosition()'
                    },
                    getProjectItem: {
                        returnType: 'ProjectItem',
                        description: 'Gets the project item in source monitor',
                        signature: 'getProjectItem()'
                    },
                    openFilePath: {
                        returnType: 'Boolean',
                        description: 'Opens a file in source monitor',
                        signature: 'openFilePath(path)',
                        parameters: ['path']
                    },
                    openProjectItem: {
                        returnType: 'Number',
                        description: 'Opens a project item in source monitor',
                        signature: 'openProjectItem(projectItem)',
                        parameters: ['projectItem']
                    },
                    play: {
                        returnType: 'Number',
                        description: 'Plays back the source monitor',
                        signature: 'play(playbackSpeed)',
                        parameters: ['playbackSpeed']
                    }
                }
            }
        }
    }
};

// Common ExtendScript constants and enums
const EXTENDSCRIPT_CONSTANTS = {
    ProjectItemType: {
        BIN: 2,
        CLIP: 1,
        FILE: 4,
        ROOT: 3
    },
    ScratchDiskType: {
        FirstVideoCaptureFolder: 1,
        FirstAudioCaptureFolder: 2,
        FirstVideoPreviewFolder: 3,
        FirstAudioPreviewFolder: 4,
        FirstAutoSaveFolder: 5,
        FirstCCLibrariesFolder: 6,
        FirstCapsuleMediaFolder: 7
    }
};

// Export for use in autocomplete system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXTENDSCRIPT_API, EXTENDSCRIPT_CONSTANTS };
} else {
    window.EXTENDSCRIPT_API = EXTENDSCRIPT_API;
    window.EXTENDSCRIPT_CONSTANTS = EXTENDSCRIPT_CONSTANTS;
}