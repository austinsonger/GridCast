const { app, BrowserWindow } = require('electron');
const { storageData, saveStorage } = require('./storage'); // Import storage.js

let mainWindow;

// Function to initialize playlists dynamically
const initializePlaylists = () => {
    const videoPlayers = ['video1', 'video2', 'video3', 'video4'];
    videoPlayers.forEach((videoId) => {
        if (!storageData[videoId]) {
            storageData[videoId] = []; // Initialize as an empty playlist
        }
    });
    saveStorage(); // Persist the initialized playlists
};

app.whenReady().then(() => {
    // Initialize playlists dynamically
    initializePlaylists();

    // Create the main window
    mainWindow = new BrowserWindow({
        width: 1728, // 2x2 grid dimensions
        height: 972,
        webPreferences: {
            nodeIntegration: true,  // Allow Node.js integration
            contextIsolation: false // Disable context isolation
        }
    });

    mainWindow.loadFile('index.html'); // Load the HTML file
    mainWindow.webContents.openDevTools(); 
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
