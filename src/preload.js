const { contextBridge, ipcRenderer } = require('electron');
const modalFunctions = require('./modal.js');
const videoControlFunctions = require('./videoControls.js');

function logAndInvoke(channel, ...args) {
    console.log(`Invoking ${channel} with args:`, args);
    return ipcRenderer.invoke(channel, ...args).catch(error => {
        console.error(`Error invoking ${channel}:`, error);
        throw error;
    });
}

function logAndSend(channel, ...args) {
    console.log(`Sending ${channel} with args:`, args);
    ipcRenderer.send(channel, ...args);
}

contextBridge.exposeInMainWorld('api', {
    // IPC functions
    openFilePicker: () => logAndInvoke('get-file-path'),
    getRepeatMode: (videoId) => logAndInvoke('get-repeat-mode', videoId),
    saveRepeatMode: (videoId, isRepeating) => logAndSend('save-repeat-mode', videoId, isRepeating),
    saveLastPlayed: (videoId, url) => logAndSend('save-last-played', videoId, url),
    getLastPlayed: () => logAndInvoke('get-last-played'),
    
    // Modal functions
    openLoadStreamModal: (...args) => {
        console.log('Calling openLoadStreamModal with args:', args);
        try {
            return modalFunctions.openLoadStreamModal(...args);
        } catch (error) {
            console.error('Error in openLoadStreamModal:', error);
            throw error;
        }
    },
    closeModal: (...args) => {
        console.log('Calling closeModal with args:', args);
        try {
            return modalFunctions.closeModal(...args);
        } catch (error) {
            console.error('Error in closeModal:', error);
            throw error;
        }
    },
    loadStreamOrFile: (...args) => {
        console.log('Calling loadStreamOrFile with args:', args);
        try {
            return modalFunctions.loadStreamOrFile(...args);
        } catch (error) {
            console.error('Error in loadStreamOrFile:', error);
            throw error;
        }
    },
    addToPlaylist: (...args) => {
        console.log('Calling addToPlaylist with args:', args);
        try {
            return modalFunctions.addToPlaylist(...args);
        } catch (error) {
            console.error('Error in addToPlaylist:', error);
            throw error;
        }
    },
    
    // Video control functions
    removeVideo: (...args) => {
        console.log('Calling removeVideo with args:', args);
        try {
            return videoControlFunctions.removeVideo(...args);
        } catch (error) {
            console.error('Error in removeVideo:', error);
            throw error;
        }
    },
    toggleRepeatMode: (...args) => {
        console.log('Calling toggleRepeatMode with args:', args);
        try {
            return videoControlFunctions.toggleRepeatMode(...args);
        } catch (error) {
            console.error('Error in toggleRepeatMode:', error);
            throw error;
        }
    }
});