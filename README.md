# GridCast

GridCast is a **macOS Electron application** that allows users to play multiple M3U8 streams and MP4 files in a **dynamic 2x2 grid layout**. Built with **Electron.js**, **MPV**, and **HLS.js**, it provides a seamless way to load, manage, and persist playlists for multiple video streams.


---

## **Features**
✅ **2x2 Grid Layout** – Four independent video players  
✅ **MPV & HLS.js Integration** – Supports M3U8 streams & MP4 playback  
✅ **Stream Loading** – Load M3U8 URLs or upload MP4 files  
✅ **Persistent Playlists** – Playlists are saved & restored on launch  
✅ **Hover-Based UI** – Controls appear only when needed  
✅ **Error Handling** – Alerts users for failed streams  
✅ **Minimal UI Design** – Clean and auto-hiding interface  


## File Structure

```bash
/gridcast
│── /src
│   │── main.js               # Electron main process
│   │── preload.js            # Secure preload script for UI functions
│   │── playerManager.js      # Handles video playback
│   │── playlistManager.js    # Manages playlists
│   │── storageManager.js     # Handles persistent storage
│   │── uiManager.js          # UI interactions and modals
│   │── eventHandlers.js      # User input events
│── /assets
│   │── style.css             # UI styles
│── /views
│   │── index.html            # App UI
│── package.json              # Project metadata
│── package-lock.json         # Dependencies
│── .github/workflows/        # GitHub Actions CI/CD workflow
│── dist/                     # Built `.dmg` files
│── localStorage.json         # Persistent playlists
```

## **Installation**

### **Download the App**
1. Navigate to the **Releases** section on GitHub.
2. Download the latest **`GridCast.dmg`** for your macOS architecture (**x64** or **arm64**).
3. Open the `.dmg` file and drag `GridCast` into your **Applications** folder.

---

## **Usage**

1. **Launch the App** – Open `GridCast` from the Applications folder.
2. **Load a Stream** – Click on a video player to input an M3U8 URL or upload an MP4 file.
3. **Manage Playlists**:
   - Click **"Add to Playlist"** after loading a stream.
   - View the playlist by hovering over the video player.
   - Click a playlist item to switch streams.
   - Remove a playlist item by clicking the **"Remove"** button.
4. **Auto-Save & Restore** – Playlists are saved and will load when the app is restarted.

---

## **Development Setup**

### **1. Clone the Repository**
```sh
git clone https://github.com/yourusername/gridcast.git
cd gridcast
```


## Install Dependencies

```sh
npm install
```

## Run the App Locally


```sh
npm start
```


## Build for macOS


```sh
npm run build:macos
```


## Dependencies
- Electron.js – Desktop application framework
- MPV.js – Video player integration
- HLS.js – M3U8 stream support
- electron-builder – Packaging and distribution
- electron-packager – App bundling


## Contributing
- Fork the repository and create a new branch.
- Make your changes and commit them.
- Submit a pull request.

## License

📜 Licensed under the



## Author 

- 💻 Created by Austin Songer
- 📧 Contact: austin@songer.me


