module.exports = {
    openLoadStreamModal: function(videoId) {
        const modal = document.getElementById("urlModal");
        if (modal) {
            modal.style.display = "block";
            modal.dataset.videoId = videoId;
        }
    },
    
    closeModal: function() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = "none";
        });
    },
    
    loadStreamOrFile: function() {
        const modal = document.getElementById("urlModal");
        const videoId = modal.dataset.videoId;
        const urlInput = document.getElementById("streamUrl");
        const fileInput = document.getElementById("videoFile");
        
        if (urlInput.value) {
            document.getElementById(videoId).src = urlInput.value;
        } else if (fileInput.files[0]) {
            const url = URL.createObjectURL(fileInput.files[0]);
            document.getElementById(videoId).src = url;
        }
        
        this.closeModal();
    },
    
    addToPlaylist: function() {
        // Similar implementation for playlist functionality
        this.closeModal();
    }
};