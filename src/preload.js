const { contextBridge, ipcRenderer } = require('electron');
const { openLoadStreamModal, openAddToPlaylistModal, closeModal } = require('./uiManager');
const { loadStreamOrFile, handleAddToPlaylist } = require('./eventHandlers');
const { loadSavedData, savePlaylists, renderPlaylist, addToPlaylist, removeFromPlaylist } = require('./playlistManager');

contextBridge.exposeInMainWorld('electronAPI', {
    openLoadStreamModal: (videoId) => openLoadStreamModal(videoId),
    openAddToPlaylistModal: (videoId) => openAddToPlaylistModal(videoId),
    closeModal: () => closeModal(),
    loadStreamOrFile: () => loadStreamOrFile(),
    handleAddToPlaylist: () => handleAddToPlaylist(),
    loadSavedData: () => loadSavedData(),
    savePlaylists: () => savePlaylists(),
    renderPlaylist: (videoId) => renderPlaylist(videoId),
    addToPlaylist: (videoId, url) => addToPlaylist(videoId, url),
    removeFromPlaylist: (videoId, index) => removeFromPlaylist(videoId, index),
});
