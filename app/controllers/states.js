/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const State = require('../models/statesModel');

// Get list of state
exports.index = async (req, res) => {
  try {
    if (req.query) {
      const state = await State.paginate(
        { country_id: req.query.country_id },
        {
          page: parseInt(req.query._page, 10) || 1,
          limit: parseInt(req.query._limit, 10) || 50,
          select: ['id', 'rid', 'name', 'country_id'],
          sort: { name: req.query._order },
          lean: true,
          leanWithId: true
        }
      );

      if (state) {
        return res.status(200).json(state);
      }
      return res.status(200).json('No Content');
    }
    return res.status(200).json('No Content');
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting state.',
      error
    });
  }
};

// Get list of state
/**
 * Get list of state
 *
 */
exports.listAll = async (req, res) => {
  try {
    if (req.body) {
      const state = await State.paginate(
        { country_id: { $in: req.body.country_id } },
        {
          page: parseInt(req.body._page, 10) || 1,
          limit: parseInt(req.body._limit, 10) || 50,
          select: ['id', 'rid', 'name', 'country_id'],
          sort: { name: req.body._order },
          lean: true,
          leanWithId: true
        }
      );
      if (state) {
        return res.status(200).json(state);
      }
      return res.status(200).json('No Content');
    }
    return res.status(200).json('No Content');
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting state.',
      error
    });
  }
};

// Get a single region
exports.show = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);
    if (state) {
      return res.json(state);
    }
    if (!state) {
      return res.status(404).send('Not Found');
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting state.',
      error
    });
  }
};

// Creates a new region in the DB.
exports.create = async (req, res) => {
  try {
    const state = await State.create(req.body);
    if (state) {
      return res.status(201).json(state);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when Creating State.',
      error
    });
  }
};

// Updates an existing region in the DB.
exports.update = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      return res.status(400).send('Not Found');
    }
    if (req.body._id) {
      delete req.body._id;
    }
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).send('Not Found');
    }

    const updated = _.extend(state, req.body);
    const updateState = await updated.save();

    if (updateState) {
      return res.status(200).json(updateState);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when updating state.',
      error
    });
  }
};

// Deletes a region from the DB.
exports.destroy = async (req, res) => {
  try {
    if (req.params.id === undefined) {
      return res.status(400).send('Not Found');
    }
    const state = await State.findById(req.params.id);

    if (!state) {
      return res.status(404).send('Not Found');
    }
    const deletState = await State.deleteOne({ id: req.params.id });
    if (deletState) {
      return res.status(200).json(deletState);
    }
    return res.status(204).send('No Content');
  } catch (error) {
    return res.status(500).json({
      message: 'Error when deleting state.',
      error
    });
  }
};
