// TODO: Re-enable MKV playback once the playback logic is fixed


let currentVideoPlayer = null;
const repeatModes = { video1: false, video2: false, video3: false, video4: false };

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded - Event Listeners Attached");

    // Open the modal for loading a stream or file
    window.openLoadStreamModal = function (videoId) {
        console.log(`openLoadStreamModal triggered for ${videoId}`);
        const modal = document.getElementById("urlModal");
        if (modal) {
            modal.style.display = "block";
            modal.dataset.videoId = videoId;
        } else {
            console.error("urlModal element not found!");
        }
    };

    // Close any modal
    window.loadStreamOrFile = async function () {
        console.log("loadStreamOrFile triggered");

        const modal = document.getElementById("urlModal");
        if (!modal) {
            console.error("urlModal not found");
            return;
        }

        const videoId = modal.dataset.videoId;
        const videoElement = document.getElementById(videoId);
        if (!videoElement) {
            console.error(`Video element with ID ${videoId} not found`);
            return;
        }

        const urlInput = document.getElementById("streamUrl").value.trim();
        const fileInput = document.getElementById("videoFile");

        if (urlInput) {
            if (urlInput.endsWith(".m3u8")) {
                if (Hls.isSupported()) {
                    console.log("HLS.js is supported. Initializing HLS playback.");

                    const hls = new Hls({
                        xhrSetup: function (xhr, url) {
                            xhr.withCredentials = false; // Disable cookies unless required
                            xhr.setRequestHeader("Authorization", "Bearer YOUR_ACCESS_TOKEN"); // Replace with actual token if needed
                        },
                    });

                    hls.loadSource(urlInput);
                    hls.attachMedia(videoElement);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        videoElement.play().catch((error) => console.error("Error playing video:", error));
                    });

                    hls.on(Hls.Events.ERROR, (event, data) => {
                        console.error("HLS.js error:", data);
                        alert("Failed to play M3U8 stream. Please check the URL and try again.");
                    });
                } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
                    console.log("Native HLS playback supported. Playing via video element.");
                    videoElement.src = urlInput;
                    videoElement.play().catch((error) => console.error("Error playing video:", error));
                } else {
                    console.error("HLS not supported in this browser.");
                    alert("HLS playback is not supported in your browser.");
                }
            } else {
                console.error("Invalid URL format. Please provide an M3U8 stream URL.");
                alert("Please provide a valid M3U8 stream URL.");
            }
        } else if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const mimeType = file.type || (file.name.endsWith(".mp4") ? "video/mp4" : "");
            if (!videoElement.canPlayType(mimeType)) {
                console.error("Unsupported file format.");
                alert("Unsupported file format. Please select a valid MP4 file.");
                return;
            }

            const filePath = URL.createObjectURL(file);
            videoElement.src = filePath;
            videoElement.play().catch((error) => console.error("Error playing video file:", error));
        } else {
            alert("Please provide a valid URL or upload a file.");
        }

        modal.style.display = "none"; // Close the modal after loading
    };

    // Add a video to the playlist
    window.addToPlaylist = function () {
        console.log("addToPlaylist triggered");

        const modal = document.getElementById("addToPlaylistModal");
        if (!modal) {
            console.error("addToPlaylistModal not found");
            return;
        }

        const videoId = modal.dataset.videoId;
        const playlistContainer = document.getElementById(`playlist-${videoId}`);
        if (!playlistContainer) {
            console.error(`Playlist container for ${videoId} not found`);
            return;
        }

        const playlistUrl = document.getElementById("addPlaylistUrl").value.trim();
        const playlistFileInput = document.getElementById("addVideoFile");

        if (playlistUrl) {
            const playlistItem = document.createElement("div");
            playlistItem.textContent = playlistUrl;
            playlistItem.className = "playlist-item";
            playlistContainer.appendChild(playlistItem);
        } else if (playlistFileInput.files.length > 0) {
            const file = playlistFileInput.files[0];
            const filePath = URL.createObjectURL(file);
            const playlistItem = document.createElement("div");
            playlistItem.textContent = file.name;
            playlistItem.dataset.src = filePath;
            playlistItem.className = "playlist-item";
            playlistContainer.appendChild(playlistItem);
        } else {
            alert("Please provide a valid URL or upload a file.");
        }

        modal.style.display = "none"; // Close the modal after adding
    };

    window.closeModal = function () {
        console.log("closeModal triggered");
        const modal = document.querySelector("#urlModal, #addToPlaylistModal");
        if (modal) {
            modal.style.display = "none";
        } else {
            console.error("closeModal: Modal element not found.");
        }
    };

    // Open file picker for MKV/MP4 files
    window.openFilePicker = async function (videoId) {
        try {
            const filePath = await window.electron.ipcRenderer.invoke("open-file-dialog");
            if (filePath) {
                console.log(`Selected file: ${filePath}`);
                const videoElement = document.getElementById(videoId);
                videoElement.src = `file://${filePath}`;
                videoElement.play();
            }
        } catch (error) {
            console.error("Error opening file picker:", error);
            alert("Failed to select a file. Please try again.");
        }
    };

    // Toggle repeat mode for a video
    window.toggleRepeatMode = function (videoId) {
        console.log(`toggleRepeatMode triggered for ${videoId}`);
        const video = document.getElementById(videoId);
        const repeatKey = `repeat-${videoId}`;
        let isRepeating = localStorage.getItem(repeatKey) === "true";

        isRepeating = !isRepeating;
        localStorage.setItem(repeatKey, isRepeating.toString());

        const repeatButton = document.querySelector(`#player${videoId.slice(-1)} .repeat-toggle`);
        if (repeatButton) {
            repeatButton.textContent = `Repeat: ${isRepeating ? "On" : "Off"}`;
        }

        if (video) {
            video.loop = isRepeating;
        }
    };
});



