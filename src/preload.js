const { contextBridge, ipcRenderer } = require('electron');

// Remove ES6 imports
const modalFunctions = require('./modal.js');
const videoControlFunctions = require('./videoControls.js');

contextBridge.exposeInMainWorld('api', {
    // IPC functions
    openFilePicker: () => ipcRenderer.invoke('get-file-path'),
    getRepeatMode: (videoId) => ipcRenderer.invoke('get-repeat-mode', videoId),
    saveRepeatMode: (videoId, isRepeating) => ipcRenderer.send('save-repeat-mode', videoId, isRepeating),
    saveLastPlayed: (videoId, url) => ipcRenderer.send('save-last-played', videoId, url),
    getLastPlayed: () => ipcRenderer.invoke('get-last-played'),
    
    // Modal functions
    openLoadStreamModal: modalFunctions.openLoadStreamModal,
    closeModal: modalFunctions.closeModal,
    loadStreamOrFile: modalFunctions.loadStreamOrFile,
    addToPlaylist: modalFunctions.addToPlaylist,
    
    // Video control functions
    removeVideo: videoControlFunctions.removeVideo,
    toggleRepeatMode: videoControlFunctions.toggleRepeatMode
});