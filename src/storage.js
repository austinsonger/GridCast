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

function saveLastPlayed(videoId, url) {
    let lastPlayed = store.get('lastPlayed') || {};
    lastPlayed[videoId] = url;
    store.set('lastPlayed', lastPlayed);
}

function getLastPlayed() {
    return store.get('lastPlayed') || {};
}

module.exports = {
    setRepeatMode,
    getRepeatMode,
    saveLastPlayed,
    getLastPlayed
};