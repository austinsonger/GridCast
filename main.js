const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const MPV = require("node-mpv");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

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
    try {
        await mpvPlayer.load(filePath);
        await mpvPlayer.play();
        console.log(`Playing MKV file: ${filePath}`);
    } catch (error) {
        console.error("Error playing MKV file:", error);
        throw new Error("Unable to play MKV file.");
    }
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
    const outputFilePath = path.join(path.dirname(inputFilePath), "output.mp4");

    return new Promise((resolve, reject) => {
        ffmpeg(inputFilePath)
            .output(outputFilePath)
            .on("end", () => {
                console.log(`Converted file saved at: ${outputFilePath}`);
                resolve(outputFilePath);
            })
            .on("error", (err) => {
                console.error("FFmpeg error:", err);
                reject(err);
            })
            .run();
    });
});
