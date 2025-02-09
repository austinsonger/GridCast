const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const MPV = require("node-mpv");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const { setRepeatMode, getRepeatMode } = require('./storage');

let mainWindow;
const mpvPlayer = new MPV();

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

app.on("ready", () => {
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

    mainWindow.loadFile("index.html");
});

// IPC Handlers
ipcMain.handle("play-mkv", async (event, filePath) => {
});

ipcMain.handle("get-file-path", async () => {
    const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{ name: "Videos", extensions: ["mkv", "mp4"] }],
    });

    if (result.canceled) {
        return null;
    }

    return result.filePaths[0];
});

ipcMain.handle("convert-mkv-to-mp4", async (event, inputFilePath) => {
});

ipcMain.on('save-repeat-mode', (event, videoId, isRepeating) => {
});

ipcMain.handle('get-repeat-mode', (event, videoId) => {
});