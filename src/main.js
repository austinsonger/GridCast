const path = require('path');

mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
        preload: path.join(__dirname, 'src/preload.js'),
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: false
    }
});
