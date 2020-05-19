/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */

const _ = require('lodash');
const Cities = require('../models/citiesModel');

// Get list of cities
exports.index = async (req, res) => {
  try {
    if (req.query) {
      const cities = await Cities.paginate(
        { country_id: req.query.country_id, region_id: req.query.region_id },
        {
          page: parseInt(req.query._page, 10) || 1,
          limit: parseInt(req.query._limit, 10) || 50,
          select: ['id', 'region_id', 'name', 'country_id', 'latitude', 'longitude'],
          sort: { name: req.query._order },
          lean: true,
          leanWithId: true
        }
      );

      if (cities) {
        return res.status(200).json(cities);
      }
      return res.status(200).json('No Content');
    }
    return res.status(200).json('No Content');
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting Cities.',
      error
    });
  }
};
// Get list of cities
exports.listAll = async (req, res) => {
  try {
    if (req.body) {
      const cityQuery = {
        $and: [{ country_id: { $in: req.body.country_id } }, { region_id: { $in: req.body.region_id } }]
      };

      const cities = await Cities.paginate(cityQuery, {
        page: parseInt(req.body._page, 10) || 1,
        limit: parseInt(req.body._limit, 10) || 50,
        select: ['id', 'region_id', 'name', 'country_id', 'latitude', 'longitude'],
        sort: { name: req.body._order },
        lean: true,
        leanWithId: true
      });

      if (cities) {
        return res.status(200).json(cities);
      }
      return res.status(200).json('No Content');
    }
    return res.status(200).json('No Content');
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting Cities.',
      error
    });
  }
};
// Get a single city
exports.show = async (req, res) => {
  try {
    const city = await Cities.findById(req.params.id);
    if (city) {
      return res.json(city);
    }
    return res.status(404).send('Not Found');
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting City.',
      error
    });
  }
};

// Creates a new city in the DB.
exports.create = async (req, res) => {
  try {
    const city = await Cities.create(req.body);
    if (city) {
      return res.status(201).json(city);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when creating Cities.',
      error
    });
  }
};

// Updates an existing city in the DB.
exports.update = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      return res.status(400).send('Not Found');
    }

    if (req.body._id) {
      delete req.body._id;
    }
    const city = await Cities.findById(req.params.id);

    if (!city) {
      return res.status(404).send('Not Found');
    }

    const updated = _.extend(city, req.body);
    const updatedCity = await updated.save();
    if (updatedCity) {
      return res.status(200).json(city);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when updating Cities.',
      error
    });
  }
};

// Deletes a city from the DB.
exports.destroy = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      return res.status(400).send('Not Found');
    }

    const city = await Cities.findById(req.params.id);

    if (!city) {
      return res.status(404).send('Not Found');
    }

    const deletecity = await Cities.deleteOne({ _id: req.params.id });
    if (deletecity) {
      return res.status(204).send('No Content');
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when deleting Cities.',
      error
    });
  }
};
