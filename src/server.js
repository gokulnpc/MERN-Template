const express = require('express');
const path = require('path');

//ROUTER IMPORTS
const friendsRouter = require('./routers/friends.router');
const messagesRouter = require('./routers/messages.router');

// APP
const app = express();

// VIEW ENGINE
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));  

// MIDDLEWARES
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

// SERVING WEBSITE
app.use('/site', express.static(path.join(__dirname, 'public')));

// CONFIGURATION
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

// ROUTERS
app.get('/', (req, res) => {
    res.render('index', { title: 'Home', content: 'Hello there!' });
}
);

app.use('/friends',friendsRouter);
app.use('/messages',messagesRouter);

// SERVER
async function start() {
    app.listen(PORT, () => {
        console.log('Server is running on http://localhost:3000');
        }
    );
}
start();