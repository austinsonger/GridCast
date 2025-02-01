const { storageData, saveStorage } = require('./storageManager');
const { loadStream } = require('./playerManager');
const { addToPlaylist, renderPlaylist } = require('./playlistManager');
const { closeModal } = require('./uiManager');

let currentVideoId = null;

// Handle loading a stream from the modal input
function loadStreamUrl() {
    const url = document.getElementById("streamUrl").value;

    if (url) {
        storageData[currentVideoId] = storageData[currentVideoId] || [];
        storageData[currentVideoId].unshift(url);
        saveStorage();
        loadStream(currentVideoId, url);
    }

    renderPlaylist(currentVideoId);
    closeModal();
}

// Handle loading either a stream URL or an MP4 file
function loadStreamOrFile() {
    const url = document.getElementById("streamUrl").value;
    const fileInput = document.getElementById("videoFile");

    if (url) {
        storageData[currentVideoId] = storageData[currentVideoId] || [];
        storageData[currentVideoId].unshift(url);
        saveStorage();
        loadStream(currentVideoId, url);
    } else if (fileInput.files.length > 0) {
        const file = URL.createObjectURL(fileInput.files[0]);
        storageData[currentVideoId] = storageData[currentVideoId] || [];
        storageData[currentVideoId].unshift(file);
        saveStorage();
        loadStream(currentVideoId, file);
    } else {
        alert("Please provide a URL or upload an MP4 file.");
        return;
    }

    renderPlaylist(currentVideoId);
    closeModal();
}

// Handle adding a URL or MP4 file to the playlist
function handleAddToPlaylist() {
    const url = document.getElementById("addPlaylistUrl").value;
    const fileInput = document.getElementById("addMp4File");

    if (url) {
        addToPlaylist(currentVideoId, url);
    } else if (fileInput.files.length > 0) {
        const file = URL.createObjectURL(fileInput.files[0]);
        addToPlaylist(currentVideoId, file);
    } else {
        alert("Please provide a URL or upload an MP4 file.");
        return;
    }

    closeModal();
}

module.exports = { loadStreamUrl, loadStreamOrFile, handleAddToPlaylist };
