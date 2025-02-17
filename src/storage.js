const Store = require('electron-store');
const store = new Store();
const log = require('electron-log');

// Function to update repeat mode
function setRepeatMode(videoId, isRepeating) {
    try {
        store.set(`repeatMode.${videoId}`, isRepeating);
        log.info(`Repeat mode for video ${videoId} set to ${isRepeating}`);
    } catch (error) {
        log.error(`Failed to set repeat mode for video ${videoId}: ${error.message}`);
    }
}

// Function to retrieve repeat mode
function getRepeatMode(videoId) {
    try {
        const repeatMode = store.get(`repeatMode.${videoId}`, false); // Default to false if not set
        log.info(`Retrieved repeat mode for video ${videoId}: ${repeatMode}`);
        return repeatMode;
    } catch (error) {
        log.error(`Failed to get repeat mode for video ${videoId}: ${error.message}`);
        return false;
    }
}

function saveLastPlayed(videoId, url) {
    try {
        let lastPlayed = store.get('lastPlayed') || {};
        lastPlayed[videoId] = url;
        store.set('lastPlayed', lastPlayed);
        log.info(`Saved last played URL for video ${videoId}: ${url}`);
    } catch (error) {
        log.error(`Failed to save last played URL for video ${videoId}: ${error.message}`);
    }
}

function getLastPlayed() {
    try {
        const lastPlayed = store.get('lastPlayed') || {};
        log.info('Retrieved last played URLs');
        return lastPlayed;
    } catch (error) {
        log.error(`Failed to get last played URLs: ${error.message}`);
        return {};
    }
}

module.exports = {
    setRepeatMode,
    getRepeatMode,
    saveLastPlayed,
    getLastPlayed
};