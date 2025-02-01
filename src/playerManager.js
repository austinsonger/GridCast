const Hls = require('hls.js');

function loadStream(videoId, url) {
    const video = document.getElementById(videoId);
    const player = video.parentElement;

    console.log(`Loading stream for videoId: ${videoId}, URL: ${url}`);

    if (Hls.isSupported() && url.endsWith('.m3u8')) {
        console.log("Loading HLS stream...");
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
            console.error("HLS Error:", data);

            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        alert("A network error occurred while loading the HLS stream. Please check the URL and your connection.");
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        alert("Failed to load the HLS stream due to a media error. Please check the URL.");
                        break;
                    default:
                        alert("An unknown error occurred while loading the HLS stream.");
                }
            } else {
                console.warn("Non-fatal HLS error. Continuing playback...");
            }
        });
    } else if (url.endsWith('.mp4') || url.endsWith('.mkv')) {
        console.log("Loading direct file:", url);
        video.src = url;
        video.load();
        video.play();
    } else if (video.canPlayType('application/vnd.apple.mpegurl') && url.endsWith('.m3u8')) {
        console.log("Native HLS support detected. Loading stream...");
        video.src = url;
        video.addEventListener("loadedmetadata", () => {
            console.log("Stream metadata loaded. Playing...");
            video.play();
        });
        video.addEventListener("error", () => {
            console.error("Error loading native HLS stream.");
            alert("Failed to load the HLS stream. Please check the URL.");
        });
    } else {
        console.error("Unsupported format:", url);
        alert("Unsupported format. Please use an MP4, MKV, or M3U8 stream.");
    }

    player.classList.add("video-playing");
    console.log(`Stream for ${videoId} loaded successfully.`);
}

module.exports = { loadStream };
