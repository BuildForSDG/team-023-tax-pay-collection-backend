/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const Country = require('../models/countriesModel');

// Get list of countrys
exports.index = async (req, res) => {
  try {
    const query = {};
    const options = {
      select: '_id id cnum name',
      collation: { locale: 'en' },
      sort: { name: -1 },
      lean: true,
      offset: 20,
      limit: 230
    };

    const countrys = await Country.paginate(query, options);
    if (countrys) {
      return res.status(200).json(countrys);
    }
    return res.status(404).json({
      message: 'No countries found'
    });
  } catch (error) {
    // console.error('Error caught processing countries', error);
    return res.status(500).json({
      message: 'Error when quering Contries API endpoint',
      error: false
    });
  }
};

// Get a single country
exports.show = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (country) {
      return res.json(country);
    }
    return res.status(404).send('Not Found');
  } catch (error) {
    return res.status(500).json({
      message: 'Error when quering Contries API endpoint',
      error
    });
  }
};

// Creates a new country in the DB.
exports.create = async (req, res) => {
  try {
    const country = await Country.create(req.body);
    if (country) {
      return res.status(201).json(country);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when creeating country',
      error
    });
  }
};

// Updates an existing country in the DB.
exports.update = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      return res.status(400).send('Not Found');
    }

    if (req.body._id) {
      delete req.body._id;
    }
    const country = await Country.findById(req.params.id);

    if (!country) {
      return res.status(404).send('Not Found');
    }
    const updated = _.extend(country, req.body);
    const countryUpdate = await updated.save();

    if (countryUpdate) {
      return res.status(200).json(country);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when updating country',
      error
    });
  }
};

/**
 *  Deletes a country from the DB.
 */

exports.destroy = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      return res.status(400).send('Not Found');
    }

    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).send('Not Found');
    }

    const deleteCountry = await Country.deleteOne({ _id: req.params.id });
    if (deleteCountry) {
      return res.status(201).json(country);
    }
    return res.status(204).send('No Content');
  } catch (error) {
    return res.status(500).json({
      message: 'Error when deleting country',
      error
    });
  }
};
