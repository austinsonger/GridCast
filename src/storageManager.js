const fs = require('fs');
const path = require('path');

const storagePath = path.join(__dirname, '../localStorage.json');

let storageData = {};

// Load storage data from file
function loadStorage() {
    try {
        if (fs.existsSync(storagePath)) {
            const rawData = fs.readFileSync(storagePath);
            storageData = JSON.parse(rawData);
        }
    } catch (error) {
        console.error("Error loading storage data:", error);
    }
}

// Save storage data to file
function saveStorage() {
    try {
        fs.writeFileSync(storagePath, JSON.stringify(storageData, null, 2));
    } catch (error) {
        console.error("Error saving storage data:", error);
    }
}

module.exports = { storageData, loadStorage, saveStorage };
