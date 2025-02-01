const { storageData, saveStorage } = require('./storageManager');
const { loadStream } = require('./playerManager');

let playlists = { ...storageData };

// Load saved playlists into the app
function loadSavedData() {
    console.log("Loading saved playlists...");

    Object.keys(storageData).forEach(videoId => {
        if (!storageData[videoId]) {
            storageData[videoId] = []; // Ensure each playlist exists
        }
        playlists[videoId] = [...storageData[videoId]];

        console.log(`Restored playlist for ${videoId}:`, playlists[videoId]);

        if (playlists[videoId].length > 0) {
            loadStream(videoId, playlists[videoId][0]); // Load the first saved video
        }

        renderPlaylist(videoId);
    });

    console.log("All saved playlists loaded successfully.");
}

// Save playlists persistently
function savePlaylists() {
    console.log("Saving playlists...");

    Object.keys(playlists).forEach(videoId => {
        if (!playlists[videoId]) {
            playlists[videoId] = []; 
        }
        storageData[videoId] = [...playlists[videoId]];
    });

    saveStorage();
    console.log("Playlists saved successfully:", storageData);
}

// Render the playlist UI and update visibility logic
function renderPlaylist(videoId) {
    const playlistElement = document.getElementById(`playlist-${videoId}`);
    const addToPlaylistButton = document.querySelector(`#${videoId}`).parentElement.querySelector('.add-to-playlist');

    playlistElement.innerHTML = "";

    playlists[videoId].forEach((url, index) => {
        const item = document.createElement("div");
        item.className = "playlist-item";
        item.innerHTML = `
            <span>${url}</span>
            <button class="remove-button" onclick="removeFromPlaylist('${videoId}', ${index})">Remove</button>
        `;
        item.querySelector("span").onclick = () => loadStream(videoId, url);
        playlistElement.appendChild(item);
    });

    if (playlists[videoId].length >= 2) {
        addToPlaylistButton.style.display = "block";
    } else {
        addToPlaylistButton.style.display = "none";
    }
}

// Add a new URL or file to the playlist
function addToPlaylist(videoId, url) {
    if (url) {
        storageData[videoId] = storageData[videoId] || [];
        storageData[videoId].push(url);
        playlists[videoId] = storageData[videoId];
    }

    saveStorage();
    renderPlaylist(videoId);
}

// Remove an item from the playlist
function removeFromPlaylist(videoId, index) {
    if (playlists[videoId] && playlists[videoId].length > index) {
        playlists[videoId].splice(index, 1);
        storageData[videoId] = [...playlists[videoId]];
        saveStorage();
        renderPlaylist(videoId);
    } else {
        console.warn(`Invalid index ${index} for ${videoId}`);
    }
}

module.exports = { loadSavedData, savePlaylists, renderPlaylist, addToPlaylist, removeFromPlaylist };
