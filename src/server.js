const app = require('./app');
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
// LOAD BALANCER
// USE PM2 TO RUN MULTIPLE INSTANCES OF THE SERVER
// pm2 start server.js -i max
// pm2 list
// pm2 monit
// pm2 stop server
// pm2 delete server
// pm2 reload server: restarts the server without downtime
// pm2 scale server +3: adds 3 more instances
// pm2 scale server 2: sets the number of instances to 2

// SERVER
async function start() {
    // Connect to the database
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();
    // Start the server
    app.listen(PORT, () => {
        console.log('Server is running on port:', PORT);
        }
    );
}
start();