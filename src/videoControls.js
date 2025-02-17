let repeatModes = {}; // Declare repeatModes outside the function

export function removeVideo(videoId) {
    try {
        console.log(`removeVideo triggered for ${videoId}`);
        const videoElement = document.getElementById(videoId);
        if (videoElement) {
            videoElement.pause();
            videoElement.removeAttribute('src'); // empty source
            videoElement.load();
            console.log(`Video element ${videoId} paused and source removed`);
        } else {
            console.warn(`Video element ${videoId} not found`);
        }

        const playlistContainer = document.getElementById(`playlist-${videoId}`);
        if (playlistContainer) {
            playlistContainer.innerHTML = ''; // Clear playlist
            console.log(`Playlist container for ${videoId} cleared`);
        } else {
            console.warn(`Playlist container for ${videoId} not found`);
        }

        const repeatButton = document.querySelector(`#player${videoId.slice(-1)} .repeat-toggle`);
        if (repeatButton) {
            repeatButton.classList.remove('active');
            console.log(`Repeat button for ${videoId} deactivated`);
        } else {
            console.warn(`Repeat button for ${videoId} not found`);
        }
    } catch (error) {
        console.error(`Error in removeVideo for ${videoId}:`, error);
    }
}

export async function toggleRepeatMode(videoId) {
    try {
        console.log(`toggleRepeatMode triggered for ${videoId}`);
        // Initialize repeatMode for this videoId if it doesn't exist
        if (repeatModes[videoId] === undefined) {
            repeatModes[videoId] = await window.electron.getRepeatMode(videoId) || false;
            console.log(`Initialized repeatMode for ${videoId}: ${repeatModes[videoId]}`);
        }

        repeatModes[videoId] = !repeatModes[videoId];
        console.log(`repeatModes[${videoId}] toggled to ${repeatModes[videoId]}`);
        const videoElement = document.getElementById(videoId);
        const repeatButton = document.querySelector(`#player${videoId.slice(-1)} .repeat-toggle`);

        if (videoElement) {
            videoElement.loop = repeatModes[videoId];
            console.log(`Video element ${videoId} loop set to ${repeatModes[videoId]}`);
        } else {
            console.warn(`Video element ${videoId} not found`);
        }

        if (repeatButton) {
            if (repeatModes[videoId]) {
                repeatButton.classList.add('active');
                repeatButton.textContent = 'Repeat: On';
            } else {
                repeatButton.classList.remove('active');
                repeatButton.textContent = 'Repeat: Off';
            }
            console.log(`Repeat button for ${videoId} updated to ${repeatButton.textContent}`);
        } else {
            console.warn(`Repeat button for ${videoId} not found`);
        }

        await window.electron.saveRepeatMode(videoId, repeatModes[videoId]);
        console.log(`Saved repeatMode for ${videoId}: ${repeatModes[videoId]}`);
    } catch (error) {
        console.error(`Error in toggleRepeatMode for ${videoId}:`, error);
    }
}