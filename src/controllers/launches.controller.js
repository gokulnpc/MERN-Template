const { getAllLaunches, addNewLaunch, abortLaunch, existsLaunchWithId } = require('../models/launches.model');
const { getPagination } = require('../services/query');
async function httpGetAllLaunch(req, res) {
    const { skip, limit } = await getPagination(req.query);
    const launches = await getAllLaunches(skip, limit);
    return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body;
    // VALIDATION
    if (!launch.mission || !launch.rocket || !launch.destionation || !launch.launchDate) {
        return res.status(400).json({ error: 'Missing required launch property' });
    }
    if (isNaN(Date.parse(launch.launchDate))) {
        return res.status(400).json({ error: 'Invalid launch date' });
    }

    launch.launchDate = new Date(launch.launchDate);
    await addNewLaunch(launch);
    return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
    console.log('aborting launch');
    const launchId = Number(req.params.id);
    const launchExists = await existsLaunchWithId(launchId);
    if (!launchExists) {
        return res.status(400).json({ error: 'Launch not found' });
    }
    const deleted = await abortLaunch(launchId);
    if (deleted) {
        return res.status(204).json({ status: 'success' });
    } else {
        return res.status(404).json({ error: 'Launch not aborted' });
    }
}

module.exports = {
    httpGetAllLaunch,
    httpAddNewLaunch,
    httpAbortLaunch
};
