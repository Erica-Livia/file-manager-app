const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const i18next = require('./config/i18n');
const i18nextMiddleware = require('i18next-http-middleware'); // Updated middleware

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(i18nextMiddleware.handle(i18next));



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
