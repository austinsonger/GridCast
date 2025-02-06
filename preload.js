const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    // Send events from renderer to main
    send: (channel, data) => ipcRenderer.send(channel, data),

    // Receive events from main to renderer
    receive: (channel, func) => ipcRenderer.on(channel, (...args) => func(...args)),

    // Save repeat mode
    saveRepeatMode: (videoId, isRepeating) => ipcRenderer.send("save-repeat-mode", videoId, isRepeating),

    // Retrieve repeat mode
    getRepeatMode: async (videoId) => {
        return await ipcRenderer.invoke("get-repeat-mode", videoId);
    },

    // Retrieve file path securely for MP4 or MKV
    getFilePath: (file) => {
        // Electron File object might not expose `path` in renderer. Return a placeholder or raise an error.
        if (file.path) {
            return file.path;
        } else {
            console.error("File path is inaccessible. Ensure this method is used correctly.");
            return null; // Return null to handle errors in render.js gracefully
        }
    },
    

    // Play MKV file with MPV
    playMkv: async (filePath) => {
        return await ipcRenderer.invoke("play-mkv", filePath);
    },

    // Add generic invoke for other methods (optional for scalability)
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
});
