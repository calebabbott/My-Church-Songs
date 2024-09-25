const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());


// Set up storage for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be saved
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

// Initialize upload middleware
const upload = multer({ storage: storage });

// Serve static files (e.g., uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle file upload route
app.post('/upload', upload.single('sheetMusic'), (req, res) => {
    const songName = req.body.songName;
    const artist = req.body.artist;
    const BPM = req.body.BPM;
    const youtubeLink = req.body.youtubeLink;
    const sheetMusicFile = req.file;

    if (!sheetMusicFile) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create the file URL for the downloadable sheet music
    const fileURL = `http://localhost:3000/uploads/${sheetMusicFile.filename}`;

    // Send the song details back to the client (including the download link)
    res.json({
        songName: songName,
        artist: artist,
        BPM: BPM,
        youtubeLink: youtubeLink,
        sheetMusicURL: fileURL,
        sheetMusicName: sheetMusicFile.originalname
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
