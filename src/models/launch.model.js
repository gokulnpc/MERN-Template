const launches = new Map()
const launch = {
    flightNumber: 100,
    mission: 'Kepler',
    rocket: 'Falcon 9',
    customers: ['NASA'],
    launchDate: new Date('December 5, 2020'),
    destionation: 'Kepler-442 b',
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    launches.set(launch.flightNumber, launch);
}

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function abortLaunchById(launchId) {
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};