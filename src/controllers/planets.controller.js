const planets = require('../models/planets.model');

const getAllPlanets = (req, res) => {
  res.status(200).json(planets);
};

module.exports = {
    getAllPlanets,    
};
