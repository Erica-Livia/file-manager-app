const path = require('path');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
    const { originalname, filename, mimetype, size } = req.file;
    const newFile = new File({
        originalName: originalname,
        fileName: filename,
        mimeType: mimetype,
        size: size,
        uploadDate: new Date()
    });

    try {
        await newFile.save();
        res.json(newFile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const filePath = path.join(__dirname, '../uploads', file.fileName);
        res.download(filePath, file.originalName);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const filePath = path.join(__dirname, '../uploads', file.fileName);
        fs.unlink(filePath, async (err) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Server error');
            }

            await file.remove();
            res.json({ message: 'File deleted' });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
