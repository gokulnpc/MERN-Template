const { Planet } = require('./planets.mongo');
const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

async function savePlanet(planet) {
    try {
        await Planet.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true // upsert: true tells MongoDB to insert a new document if a matching document is not found
        });
    } catch (error) {
        console.error(`Could not save planet ${error}`);
    }
}

async function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

async function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true
            }))
            .on('data', async (data) => {
                if (await isHabitablePlanet(data)) {
                    await savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on('end', async () => {
                const countPlanetsFound = (await getAllPlanets()).length;
                console.log(`${countPlanetsFound} habitable planets found!`);
                resolve();
            });
    });
}
async function getAllPlanets() {
    return await Planet.find({},
        {
            '_id': 0, '__v': 0 // Exclude _id and __v fields
        }
    );
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
};
