const Launch = require('./launches.mongo');
const { Planet } = require('./planets.mongo');
const axios = require('axios');

async function saveLaunch(launch) {
    try {
        await Launch.findOneAndUpdate({
            flightNumber: launch.flightNumber
        }, launch, {
            upsert: true
        }); 
    } catch (error) {
        console.error(`Could not save launch ${error}`);
    }
}

async function findLaunch(filter) {
    return await Launch.findOne(filter);
}

async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });
  if (firstLaunch) {
    console.log('Launch data already loaded!');
  } else {
    await populateLaunches();
  }
}

async function populateLaunches() {
    console.log('Downloading launch data...');
    const response = await axios.post('https://api.spacexdata.com/v5/launches/query/', {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
            ]
        }
    });
    const launchData = await response.data.docs;
    console.log('Populating launch data...');
    for(const launch of launchData) {
        const payloads = launch['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        });
        const launchData = {
            flightNumber: launch['flight_number'],
            mission: launch['name'],
            rocket: launch['rocket']['name'],
            launchDate: launch['date_local'],
            upcoming: launch['upcoming'],
            success: launch['success'],
            customers
        };
        console.log(`${launchData.flightNumber} ${launchData.mission}`);
        await saveLaunch(launchData);
    }
    

}

async function getAllLaunches(skip, limit) {
    return await Launch.find({},
        {
            '_id': 0, '__v': 0 // Exclude _id and __v fields
        }
    ).sort({ flightNumber: 1 }).skip(skip).limit(limit);
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
    const planet = await Planet.findOne({
        keplerName: launch.target
    });
    if (!planet) {
        throw new Error('No matching planet was found');
    }
    launch.target = planet;
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
    existsLaunchWithId,
    loadLaunchData
};
