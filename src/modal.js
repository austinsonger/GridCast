module.exports = {
    openLoadStreamModal: function(videoId) {
        try {
            const modal = document.getElementById("urlModal");
            if (modal) {
                modal.style.display = "block";
                modal.dataset.videoId = videoId;
                console.log(`Modal opened for videoId: ${videoId}`);
            } else {
                console.error("Modal with id 'urlModal' not found.");
            }
        } catch (error) {
            console.error("Error opening load stream modal:", error);
        }
    },
    
    closeModal: function() {
        try {
            const modals = document.querySelectorAll('.modal');
            if (modals.length > 0) {
                modals.forEach(modal => {
                    modal.style.display = "none";
                });
                console.log("All modals closed.");
            } else {
                console.warn("No modals found to close.");
            }
        } catch (error) {
            console.error("Error closing modals:", error);
        }
    },
    
    loadStreamOrFile: function() {
        try {
            const modal = document.getElementById("urlModal");
            if (!modal) {
                console.error("Modal with id 'urlModal' not found.");
                return;
            }
            
            const videoId = modal.dataset.videoId;
            const urlInput = document.getElementById("streamUrl");
            const fileInput = document.getElementById("videoFile");
            
            if (!videoId) {
                console.error("No videoId found in modal dataset.");
                return;
            }
            
            if (urlInput && urlInput.value) {
                document.getElementById(videoId).src = urlInput.value;
                console.log(`Stream URL set for videoId: ${videoId}`);
            } else if (fileInput && fileInput.files[0]) {
                const url = URL.createObjectURL(fileInput.files[0]);
                document.getElementById(videoId).src = url;
                console.log(`File URL set for videoId: ${videoId}`);
            } else {
                console.warn("No stream URL or file selected.");
            }
            
            this.closeModal();
        } catch (error) {
            console.error("Error loading stream or file:", error);
        }
    },
    
    addToPlaylist: function() {
        try {
            const modal = document.getElementById("addToPlaylistModal");
            if (!modal) {
                console.error("Modal with id 'addToPlaylistModal' not found.");
                return;
            }
    
            const videoId = modal.dataset.videoId;
            const urlInput = document.getElementById("addPlaylistUrl");
            const fileInput = document.getElementById("addVideoFile");
            const playlist = document.getElementById(`playlist-${videoId}`);
    
            if (!videoId) {
                console.error("No videoId found in modal dataset.");
                return;
            }
    
            let listItem = document.createElement("div");
            listItem.className = "playlist-item";
    
            let source = null;
            if (urlInput && urlInput.value) {
                source = urlInput.value;
                listItem.textContent = urlInput.value;
            } else if (fileInput && fileInput.files.length > 0) {
                source = URL.createObjectURL(fileInput.files[0]);
                listItem.textContent = fileInput.files[0].name;
            } else {
                console.warn("No stream URL or file selected for playlist.");
                return;
            }
    
            listItem.dataset.src = source;
            listItem.onclick = function() {
                document.getElementById(videoId).src = this.dataset.src;
            };
    
            playlist.appendChild(listItem);
            this.closeModal();
            console.log("Added to playlist...");
        } catch (error) {
            console.error("Error adding to playlist:", error);
        }
    }
};