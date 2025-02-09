const Store = require('electron-store');

const store = new Store();

// Function to update repeat mode
function setRepeatMode(videoId, isRepeating) {
    store.set(`repeatMode.${videoId}`, isRepeating);
}

// Function to retrieve repeat mode
function getRepeatMode(videoId) {
    return store.get(`repeatMode.${videoId}`, false); // Default to false if not set
}

module.exports = {
    setRepeatMode,
    getRepeatMode
};