const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const i18next = require('./config/i18n');
const i18nextMiddleware = require('i18next-http-middleware');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/files');
const app = express();
const path = require ('path');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const User = require('./models/user');
const File = require('./models/File');







// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Initialize session
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

// Initialize Passport

app.use(passport.initialize());
app.use(passport.session());


// Set up flash messages
app.use(flash());

// Custom middleware to expose flash messages to views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use(i18nextMiddleware.handle(i18next));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'front_end')));

// Route to serve index.html

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './front_end/index.html'));
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

//Middleware setup

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 



// Routes
app.use('/auth', authRoutes);
app.use('/files', fileRoutes);


// Define Passport strategy
passport.use(new LocalStrategy(
    async function(username, password, done) {
      try {
        const user = await User.findOne({ username: username }).exec();
        if (!user) return done(null, false);
        // further password validation...
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));


  app.get('/user/:id', async function(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id }).exec();
      if (!user) return res.status(404).send('User not found');
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  