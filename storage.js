const fs = require('fs');
const path = require('path');

// Determine which storage file to use
const isProduction = process.env.NODE_ENV === 'production';
const storageFile = isProduction
  ? path.join(__dirname, 'packagestore.json') // Empty storage for packaged builds
  : path.join(__dirname, 'localStorage.json'); // Local storage for development

// Load storage data
let storageData = {};
if (fs.existsSync(storageFile)) {
  storageData = JSON.parse(fs.readFileSync(storageFile, 'utf-8'));
} else {
  console.log(`No storage file found. Using an empty storage.`);
  storageData = { repeatModes: {} }; // Ensure repeatModes object exists
}

// Save function
function saveStorage() {
  fs.writeFileSync(storageFile, JSON.stringify(storageData, null, 2));
}

// Function to update repeat mode
function setRepeatMode(videoId, isRepeating) {
  storageData.repeatModes = storageData.repeatModes || {}; // Ensure repeatModes exists
  storageData.repeatModes[videoId] = isRepeating;
  saveStorage();
}

// Function to retrieve repeat mode
function getRepeatMode(videoId) {
  return storageData.repeatModes?.[videoId] ?? false; // Default to false if not set
}

// Export the storage object and functions
module.exports = {
  storageData,
  saveStorage,
  setRepeatMode,
  getRepeatMode
};
