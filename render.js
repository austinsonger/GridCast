document.addEventListener("DOMContentLoaded", () => {
    // Open Load Stream Modal
    window.openLoadStreamModal = function (videoId) {
        try {
            const modal = document.getElementById("urlModal");
            modal.style.display = "block";
            modal.style.position = "absolute";
            modal.style.top = "50%";
            modal.style.left = "50%";
            modal.style.transform = "translate(-50%, -50%)";
            modal.style.width = "400px";
            modal.style.height = "400px";
            modal.style.padding = "20px";
            modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            modal.style.borderRadius = "8px";
            modal.style.backgroundColor = "#fff";
            modal.dataset.videoId = videoId; // Store video ID in modal
            console.log("Modal opened for videoId:", videoId); // Debugging

            // Check for saved URL/file
            const savedSource = localStorage.getItem(`videoSource-${videoId}`);
            if (savedSource) {
                document.getElementById("streamUrl").value = savedSource;
            }
        } catch (error) {
            console.error("Error opening load stream modal:", error);
        }
    };

    // Toggle Repeat Mode
    window.toggleRepeatMode = function (videoId) {
        try {
            const video = document.getElementById(videoId);
            const button = document.getElementById(`repeat-${videoId}`);
            if (video.loop) {
                video.loop = false;
                button.textContent = "Repeat: Off";
            } else {
                video.loop = true;
                button.textContent = "Repeat: On";
            }
            console.log(`Repeat mode toggled for videoId: ${videoId}, loop: ${video.loop}`);
        } catch (error) {
            console.error("Error toggling repeat mode:", error);
        }
    };

    // Remove Video
    window.removeVideo = function (videoId) {
        try {
            const video = document.getElementById(videoId);
            video.src = "";
            console.log(`Video removed for videoId: ${videoId}`);
        } catch (error) {
            console.error("Error removing video:", error);
        }
    };

    // Load Stream or File
    window.api = {
        loadStreamOrFile: function () {
            try {
                const url = document.getElementById("streamUrl").value;
                const fileInput = document.getElementById("videoFile");
                const modal = document.getElementById("urlModal");
                const videoId = modal.dataset.videoId;
                const video = document.getElementById(videoId);

                let source = null;

                if (url) {
                    source = url;
                    if (Hls.isSupported()) {
                        console.log("HLS is supported"); // Debugging
                        const hls = new Hls();
                        hls.loadSource(url);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED, () => {
                            video.play();
                        });
                        hls.on(Hls.Events.ERROR, (event, data) => {
                            console.error("HLS error:", data);
                        });
                    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        console.log("HLS natively supported"); // Debugging
                        video.src = url;
                        video.addEventListener('loadedmetadata', () => {
                            video.play();
                        });
                    } else {
                        console.error("HLS is not supported on this browser.");
                    }
                } else if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    source = URL.createObjectURL(file);
                    video.src = source;
                    video.load();
                }

                if (source) {
                    window.api.saveLastPlayed(videoId, source);
                }

                this.closeModal();
            } catch (error) {
                console.error("Error loading stream or file:", error);
            }
        },

        addToPlaylist: function () {
            try {
                const url = document.getElementById("addPlaylistUrl").value;
                const fileInput = document.getElementById("addVideoFile");
                const playlist = document.getElementById(`playlist-${window.targetVideoId}`);

                let listItem = document.createElement("div");
                listItem.className = "playlist-item";

                if (url) {
                    listItem.textContent = url;
                    listItem.dataset.src = url;
                } else if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const objectUrl = URL.createObjectURL(file);
                    listItem.textContent = file.name;
                    listItem.dataset.src = objectUrl;
                }

                listItem.onclick = function () {
                    try {
                        const video = document.getElementById(window.targetVideoId);
                        video.src = this.dataset.src;
                        video.load();
                        console.log(`Video source set from playlist item: ${this.dataset.src}`);
                    } catch (error) {
                        console.error("Error setting video source from playlist item:", error);
                    }
                };

                playlist.appendChild(listItem);
                this.closeModal();
                console.log("Added to playlist:", listItem.textContent);
            } catch (error) {
                console.error("Error adding to playlist:", error);
            }
        },

        saveLastPlayed: function (videoId, source) {
            try {
                localStorage.setItem(`lastPlayed-${videoId}`, source);
                console.log(`Saved last played video for ${videoId}: ${source}`);
            } catch (error) {
                console.error("Error saving last played video:", error);
            }
        },

        getLastPlayed: async function () {
            try {
                const lastPlayed = {};
                for (let i = 1; i <= 4; i++) {
                    const videoId = `video${i}`;
                    const source = localStorage.getItem(`lastPlayed-${videoId}`);
                    if (source) {
                        lastPlayed[videoId] = source;
                    }
                }
                console.log("Retrieved last played videos:", lastPlayed);
                return lastPlayed;
            } catch (error) {
                console.error("Error getting last played videos:", error);
                return {};
            }
        },

        closeModal: function () {
            try {
                const modals = document.querySelectorAll(".modal");
                modals.forEach(modal => {
                    modal.style.display = "none";
                });
                console.log("Modals closed");
            } catch (error) {
                console.error("Error closing modal:", error);
            }
        }
    };

    // Close Modal when clicking outside
    window.onclick = function (event) {
        try {
            const modals = document.querySelectorAll(".modal");
            modals.forEach(modal => {
                if (event.target === modal) {
                    const videoId = modal.dataset.videoId; // Get video ID from modal
                    const video = document.getElementById(videoId);

                    console.log("Closing modal for videoId:", videoId); // Debugging

                    // Save the video source before closing
                    if (video && video.src) {
                        console.log("Saving video source:", video.src); // Debugging
                        localStorage.setItem(`videoSource-${videoId}`, video.src);
                    } else {
                        console.log("Video or video source is not available."); // Debugging
                    }

                    modal.style.display = "none";
                }
            });

            // Clear the stream URL input
            document.getElementById("streamUrl").value = "";

            // Clear the video file input by replacing the element
            const fileInput = document.getElementById("videoFile");
            const newFileInput = document.createElement("input");
            newFileInput.type = "file";
            newFileInput.id = "videoFile";
            newFileInput.accept = "video/*";
            fileInput.parentNode.replaceChild(newFileInput, fileInput);

            console.log("Stream URL and video file input cleared");
        } catch (error) {
            console.error("Error handling window click event:", error);
        }
    };

    // Load last played videos on startup
    window.api.getLastPlayed().then(lastPlayed => {
        try {
            for (const videoId in lastPlayed) {
                const video = document.getElementById(videoId);
                if (video) {
                    video.src = lastPlayed[videoId];
                     video.addEventListener('loadedmetadata', () => {
                        video.play();
                        console.log(`Loaded and playing last played video for videoId: ${videoId}`);
                    });
                    video.addEventListener('error', (error) => {
                        console.error(`Error loading last played video for videoId: ${videoId}`, error);
                    });
                }
            }
        } catch (error) {
            console.error("Error loading last played videos:", error);
        }
    }).catch(error => {
        console.error("Error fetching last played videos:", error);
    });
});