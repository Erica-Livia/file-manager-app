const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('../config/passport');
const db = require('../config/db');
const router = express.Router();

router.post('/register', async (req, res) => {
    console.log(req.body); // Log the request body for debugging
  
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send('Missing required fields');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, results) => {
        if (err) throw err;
        res.send('User registered');
      });
  });
  
// GET login page
router.get('/login', (req, res) => {
    res.render('login', {
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg')
    });
});

// POST login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
