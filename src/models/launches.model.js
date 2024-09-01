const { Launch } = require('./launches.mongo');
const { Planet } = require('./planets.mongo');
const fs = require('fs');

async function saveLaunch(launch) {
    try {
        const planet = await Planet.findOne({
            keplerName: launch.target
        });
        if (!planet) {
            throw new Error('No matching planet was found');
        }
        launch.target = planet;
        await Launch.findByIdAndUpdate({
            flightNumber: launch.flightNumber
        }, launch, {
            upsert: true
        });
    } catch (error) {
        console.error(`Could not save launch ${error}`);
    }
}

async function populateLaunches() {
    console.log('Downloading launch data...');
    const response = await fetch('https://api.spacexdata.com/v5/launches/latest');
    console.log('Download complete.: ');
    const launchData = await response.json();
    console.log('Populating launch data...: ');
    // SAVE LAUNCH DATA TO JSON FILE
    const launches = launchData.map((launch) => ({
        flightNumber: launch.flight_number,
        mission: launch.name,
        launchDate: launch.date_utc,
        rocket: launch.rocket,
        customers: launch.customers
    }));
    fs.writeFileSync('./launches.json', JSON.stringify(launches, null, 2));

}

async function getAllLaunches() {
    return await Launch.find({},
        {
            '_id': 0, '__v': 0 // Exclude _id and __v fields
        }
    );
}

// AUTO INCREMENT FLIGHT NUMBER
async function getLatestFlightNumber() {
    const latestLaunch = await Launch.findOne().sort('-flightNumber');
    if (!latestLaunch) {
        return 0;
    }
    return latestLaunch.flightNumber;
}

async function addNewLaunch(launch) {
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['NASA'],
        flightNumber: newFlightNumber
    });
    await saveLaunch(newLaunch);
}

async function existsLaunchWithId(launchId) {
    return await Launch.findOne({
        flightNumber: launchId
    });
}

async function abortLaunch(launchId) {
    const aborted =  await Launch.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });
    return aborted.modifiedCount===1;
}


module.exports = {
    populateLaunches,
    getAllLaunches,
    addNewLaunch,
    abortLaunch,
    existsLaunchWithId
};
