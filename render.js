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
        window.targetVideoId = videoId; // Save video ID for reference
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
                modal.style.display = "none";
            }
        });
    };
});
