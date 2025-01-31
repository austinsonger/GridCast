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
}

// Save function
function saveStorage() {
  fs.writeFileSync(storageFile, JSON.stringify(storageData, null, 2));
}

// Export the storage object
module.exports = {
  storageData,
  saveStorage
};
