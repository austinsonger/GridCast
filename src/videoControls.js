let repeatModes = {}; // Declare repeatModes outside the function

export function removeVideo(videoId) {
    console.log(`removeVideo triggered for ${videoId}`);
    const videoElement = document.getElementById(videoId);
    if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute('src'); // empty source
        videoElement.load();
    }

    const playlistContainer = document.getElementById(`playlist-${videoId}`);
    if (playlistContainer) {
        playlistContainer.innerHTML = ''; // Clear playlist
    }

    const repeatButton = document.querySelector(`#player${videoId.slice(-1)} .repeat-toggle`);
    if (repeatButton) {
        repeatButton.classList.remove('active');
    }
}

export async function toggleRepeatMode(videoId) {
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

    if (repeatModes[videoId]) {
        repeatButton.classList.add('active');
        repeatButton.textContent = 'Repeat: On';
    } else {
        repeatButton.classList.remove('active');
        repeatButton.textContent = 'Repeat: Off';
    }

    await window.electron.saveRepeatMode(videoId, repeatModes[videoId]);
    console.log(`Saved repeatMode for ${videoId}: ${repeatModes[videoId]}`);

    videoElement.loop = repeatModes[videoId];
}