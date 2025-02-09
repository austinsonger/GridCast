document.addEventListener('DOMContentLoaded', () => {
    // Load Stream buttons
    document.querySelectorAll('.load-stream').forEach(button => {
        button.addEventListener('click', (e) => {
            const videoId = e.target.dataset.videoId;
            window.api.openLoadStreamModal(videoId);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            window.api.closeModal();
        }
    });
});