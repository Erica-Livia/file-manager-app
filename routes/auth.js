const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../config/db');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        (err, results) => {
            if (err) throw err;
            res.send('User registered');
        });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

module.exports = router;
