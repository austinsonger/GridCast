const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const { setRepeatMode, getRepeatMode, saveLastPlayed, getLastPlayed } = require('./storage');
const log = require('electron-log');

let mainWindow;

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

app.on("ready", () => {
    log.info("App is ready");

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true,
            allowRunningInsecureContent: false,
        },
    });

    mainWindow.loadFile("index.html").then(() => {
        log.info("Main window loaded");
    }).catch(err => {
        log.error("Failed to load main window:", err);
    });
});

// IPC Handlers
ipcMain.handle("play-mkv", async (event, filePath) => {
    try {
        log.info(`Playing MKV file: ${filePath}`);
        // Add your play logic here
    } catch (err) {
        log.error("Error playing MKV file:", err);
        throw err;
    }
});

ipcMain.handle("get-file-path", async () => {
    try {
        const result = await dialog.showOpenDialog({
            properties: ["openFile"],
            filters: [{ name: "Videos", extensions: ["mkv", "mp4"] }],
        });

        if (result.canceled) {
            log.info("File selection canceled");
            return null;
        }

        log.info(`File selected: ${result.filePaths[0]}`);
        return result.filePaths[0];
    } catch (err) {
        log.error("Error getting file path:", err);
        throw err;
    }
});

ipcMain.handle("convert-mkv-to-mp4", async (event, inputFilePath) => {
    try {
        log.info(`Converting MKV to MP4: ${inputFilePath}`);
        // Add your conversion logic here
    } catch (err) {
        log.error("Error converting MKV to MP4:", err);
        throw err;
    }
});

ipcMain.on('save-repeat-mode', (event, videoId, isRepeating) => {
    try {
        log.info(`Saving repeat mode for video ${videoId}: ${isRepeating}`);
        setRepeatMode(videoId, isRepeating);
    } catch (err) {
        log.error("Error saving repeat mode:", err);
    }
});

ipcMain.handle('get-repeat-mode', (event, videoId) => {
    try {
        log.info(`Getting repeat mode for video ${videoId}`);
        return getRepeatMode(videoId);
    } catch (err) {
        log.error("Error getting repeat mode:", err);
        throw err;
    }
});

ipcMain.on('save-last-played', (event, videoId, url) => {
    try {
        log.info(`Saving last played for video ${videoId}: ${url}`);
        saveLastPlayed(videoId, url);
    } catch (err) {
        log.error("Error saving last played:", err);
    }
});

ipcMain.handle('get-last-played', (event) => {
    try {
        log.info("Getting last played");
        return getLastPlayed();
    } catch (err) {
        log.error("Error getting last played:", err);
        throw err;
    }
});