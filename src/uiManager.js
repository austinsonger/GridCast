let currentVideoId = null;

// Open the modal for loading a new stream
function openLoadStreamModal(videoId) {
    console.log(`Opening Load Stream modal for ${videoId}`);

    currentVideoId = videoId;
    const modal = document.getElementById("urlModal");

    if (modal) {
        modal.style.display = "block";
        document.getElementById("streamUrl").value = "";
        document.getElementById("videoFile").value = ""; // Clear the file input
        console.log("Load Stream modal opened successfully.");
    } else {
        console.error("Error: Load Stream modal not found.");
    }
}

// Open the modal for adding a new URL or file to a playlist
function openAddToPlaylistModal(videoId) {
    currentVideoId = videoId;
    document.getElementById("addToPlaylistModal").style.display = "block";
    document.getElementById("addPlaylistUrl").value = "";
}

// Close any open modals
function closeModal() {
    console.log("Closing modals...");
    const urlModal = document.getElementById("urlModal");
    const addToPlaylistModal = document.getElementById("addToPlaylistModal");

    if (urlModal) {
        console.log("Hiding URL Modal...");
        urlModal.style.display = "none";
    } else {
        console.warn("URL Modal not found.");
    }

    if (addToPlaylistModal) {
        console.log("Hiding Add to Playlist Modal...");
        addToPlaylistModal.style.display = "none";
    } else {
        console.warn("Add to Playlist Modal not found.");
    }
}

module.exports = { openLoadStreamModal, openAddToPlaylistModal, closeModal };
