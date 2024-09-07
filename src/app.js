const express = require('express');
const path = require('path');
const cors = require('cors');
const { api } = require('./routers/api');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
require('dotenv').config();

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

// PASSPORT GOOGLE AUTH CONFIG
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

const AUTH_OPTIONS = {
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
};

const verifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    console.log('Profile:', profile);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
app.use(passport.initialize());

// GOOGLE OAUTH ROUTES
app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failure', session: false }), (req, res) => {
    res.redirect('/success');
});

app.get('/success', (req, res) => {
    res.send('Successfully authenticated with Google!');
});

app.get('/failure', (req, res) => {
    res.send('Failed to authenticate.');
});

app.get('/auth/logout', (req, res) => {
    res.send('You have been logged out.');
});

// Protected Route with Authentication and Permission
function checkAuth(req, res, next) {
    const token = req.headers['authorization'];
    if (!token || token !== 'Bearer mytoken') {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
}

function checkPermission(req, res, next) {
    const permission = req.headers['permission'];
    if (!permission || permission !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

app.get('/secret', checkAuth, checkPermission, (req, res) => {
    res.send('This is a secret page!');
});

// Static Files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Load API routers
app.use('/v1', api);

// Serve index.html for unmatched routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;