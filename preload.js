const { contextBridge, ipcRenderer } = require('electron');

// Remove ES6 imports
const modalFunctions = require('./modal.js');
const videoControlFunctions = require('./videoControls.js');

contextBridge.exposeInMainWorld('api', {
    // IPC functions
    openFilePicker: () => ipcRenderer.invoke('get-file-path'),
    getRepeatMode: (videoId) => ipcRenderer.invoke('get-repeat-mode', videoId),
    saveRepeatMode: (videoId, isRepeating) => ipcRenderer.send('save-repeat-mode', videoId, isRepeating),
    
    // Modal functions
    openLoadStreamModal: modalFunctions.openLoadStreamModal,
    closeModal: modalFunctions.closeModal,
    loadStreamOrFile: modalFunctions.loadStreamOrFile,
    addToPlaylist: modalFunctions.addToPlaylist,
    
    // Video control functions
    removeVideo: videoControlFunctions.removeVideo,
    toggleRepeatMode: videoControlFunctions.toggleRepeatMode
});