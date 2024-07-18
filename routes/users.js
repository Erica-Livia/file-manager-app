const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/set-language', (req, res) => {
    const { language } = req.body;
    const userId = req.user.id;

    db.query('UPDATE users SET language_preference = ? WHERE id = ?', [language, userId], (err, results) => {
        if (err) throw err;
        res.send('Language preference updated');
    });
});

module.exports = router;
