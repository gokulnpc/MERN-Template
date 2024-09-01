const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = "mongodb+srv://mern:Fu5fPuwJc5nScnB5@cluster0.cnxqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
};
