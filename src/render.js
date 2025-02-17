document.addEventListener("DOMContentLoaded", () => {
    // Open Load Stream Modal
    window.openLoadStreamModal = function (videoId) {
        try {
            console.log(`Opening load stream modal for video ID: ${videoId}`);
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
            window.targetVideoId = videoId; // Save video ID for reference
        } catch (error) {
            console.error(`Error opening load stream modal: ${error}`);
        }
    };

    // Toggle Repeat Mode
    window.toggleRepeatMode = function (videoId) {
        try {
            console.log(`Toggling repeat mode for video ID: ${videoId}`);
            const video = document.getElementById(videoId);
            const button = document.getElementById(`repeat-${videoId}`);
            if (video.loop) {
                video.loop = false;
                button.textContent = "Repeat: Off";
            } else {
                video.loop = true;
                button.textContent = "Repeat: On";
            }
        } catch (error) {
            console.error(`Error toggling repeat mode: ${error}`);
        }
    };

    // Remove Video
    window.removeVideo = function (videoId) {
        try {
            console.log(`Removing video with ID: ${videoId}`);
            const video = document.getElementById(videoId);
            video.src = "";
        } catch (error) {
            console.error(`Error removing video: ${error}`);
        }
    };

    // Load Stream or File
    window.api = {
        loadStreamOrFile: function () {
            try {
                console.log("Loading stream or file");
                const url = document.getElementById("streamUrl").value;
                const fileInput = document.getElementById("videoFile");
                const video = document.getElementById(window.targetVideoId);

                if (url) {
                    video.src = url;
                    video.load();
                } else if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const objectUrl = URL.createObjectURL(file);
                    video.src = objectUrl;
                    video.load();
                }

                this.closeModal();
            } catch (error) {
                console.error(`Error loading stream or file: ${error}`);
            }
        },

        addToPlaylist: function () {
            try {
                console.log("Adding to playlist");
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
                        console.log(`Playing video from playlist item: ${this.dataset.src}`);
                        const video = document.getElementById(window.targetVideoId);
                        video.src = this.dataset.src;
                        video.load();
                    } catch (error) {
                        console.error(`Error playing video from playlist: ${error}`);
                    }
                };

                playlist.appendChild(listItem);
                this.closeModal();
            } catch (error) {
                console.error(`Error adding to playlist: ${error}`);
            }
        },

        closeModal: function () {
            try {
                console.log("Closing modal");
                const modals = document.querySelectorAll(".modal");
                modals.forEach(modal => {
                    modal.style.display = "none";
                });
            } catch (error) {
                console.error(`Error closing modal: ${error}`);
            }
        }
    };

    // Close Modal when clicking outside
    window.onclick = function (event) {
        try {
            const modals = document.querySelectorAll(".modal");
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        } catch (error) {
            console.error(`Error handling window click: ${error}`);
        }
    };
});
