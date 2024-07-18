const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./db');

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        (email, password, done) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
                if (err) return done(err);
                if (results.length === 0) return done(null, false, { message: 'No user with that email' });

                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) return done(null, user);
                return done(null, false, { message: 'Incorrect password' });
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) return done(err);
            return done(null, results[0]);
        });
    });
};
