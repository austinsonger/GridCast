document.addEventListener("DOMContentLoaded", () => {
    // Open Load Stream Modal
    window.openLoadStreamModal = function (videoId) {
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
    };

    // Toggle Repeat Mode
    window.toggleRepeatMode = function (videoId) {
        const video = document.getElementById(videoId);
        const button = document.getElementById(`repeat-${videoId}`);
        if (video.loop) {
            video.loop = false;
            button.textContent = "Repeat: Off";
        } else {
            video.loop = true;
            button.textContent = "Repeat: On";
        }
    };

    // Remove Video
    window.removeVideo = function (videoId) {
        const video = document.getElementById(videoId);
        video.src = "";
    };

    // Load Stream or File
    window.api = {
        loadStreamOrFile: function () {
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
        },

        addToPlaylist: function () {
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
                const video = document.getElementById(window.targetVideoId);
                video.src = this.dataset.src;
                video.load();
            };

            playlist.appendChild(listItem);
            this.closeModal();
        },

        closeModal: function () {
            const modals = document.querySelectorAll(".modal");
            modals.forEach(modal => {
                modal.style.display = "none";
            });
        }
    };

    // Close Modal when clicking outside
    window.onclick = function (event) {
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


    };

    // Load last played videos on startup
    window.api.getLastPlayed().then(lastPlayed => {
        for (const videoId in lastPlayed) {
            const video = document.getElementById(videoId);
            if (video) {
                video.src = lastPlayed[videoId];
            }
        }
    });
});