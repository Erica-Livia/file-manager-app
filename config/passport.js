// passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Configure the local strategy
passport.use(new LocalStrategy(
    {
        usernameField: 'email', // Replace with the field you use for the username
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            // Find user by email
            const user = await User.findOne({ email });

            if (!user) {
                return done(null, false, { message: 'No user with that email' });
            }

            // Check password
            const isMatch = await user.comparePassword(password); // Ensure you have a comparePassword method in your User model

            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
