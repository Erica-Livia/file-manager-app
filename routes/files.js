const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Upload a new file

router.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Process the file and send a JSON response
    res.json({ message: 'File uploaded successfully', file });
});


// Download a file
router.get('/download/:id', fileController.downloadFile);

// Delete a file
router.delete('/delete/:id', fileController.deleteFile);

// Get list of files
router.get('/list', async (req, res) => {
    try {
        const files = await File.find(); 
        res.json(files);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
