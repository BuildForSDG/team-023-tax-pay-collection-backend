const uuid = require('uuid');
const { matchedData } = require('express-validator');
const UserModel = require('../models/user');
const utils = require('../middleware/utils');
const db = require('../middleware/db');
const emailer = require('../middleware/emailer');

/** *******************
 * Private functions *
 ******************** */

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = async (req) => new Promise((resolve, reject) => {
  const user = new UserModel({
    frist_name: req.frist_name,
    middle_name: req.middle_name,
    last_name: req.last_name,
    date_of_birth: req.date_of_birth,
    email: req.email,
    password: req.password,
    role: req.role,
    phone: req.phone,
    city: req.city,
    state: req.state,
    country: req.country,
    location: req.location,
    verification: uuid.v4()
  });
  user.save((err, item) => {
    if (err) {
      reject(utils.buildErrObject(422, err.message));
    }
    // Removes properties with rest operator
    const removeProperties = ({
      // eslint-disable-next-line no-unused-vars
      password,
      // eslint-disable-next-line no-unused-vars
      blockExpires,
      // eslint-disable-next-line no-unused-vars
      loginAttempts,
      ...rest
    }) => rest;
    resolve(removeProperties(item.toObject()));
  });
});

/** ******************
 * Public functions *
 ******************* */

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItems = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query);
    res.status(200).json(await db.getItems(req, UserModel, query));
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.getItem = async (req, res) => {
  try {
    const reqBody = matchedData(req);
    const id = await utils.isIDGood(reqBody.id);
    res.status(200).json(await db.getItem(id, UserModel));
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateItem = async (req, res) => {
  try {
    const reqBody = matchedData(req);
    const id = await utils.isIDGood(reqBody.id);
    const doesEmailExists = await emailer.emailExistsExcludingMyself(id, reqBody.email);
    if (!doesEmailExists) {
      res.status(200).json(await db.updateItem(id, UserModel, reqBody));
    }
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.createItem = async (req, res) => {
  try {
    // Gets locale from header 'Accept-Language'
    const locale = req.getLocale();
    const reqBody = matchedData(req);
    const doesEmailExists = await emailer.emailExists(reqBody.email);
    if (!doesEmailExists) {
      const item = await createItem(reqBody);
      emailer.sendRegistrationEmailMessage(locale, item);
      res.status(201).json(item);
    }
  } catch (error) {
    utils.handleError(res, error);
  }
};

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.deleteItem = async (req, res) => {
  try {
    const reqBody = matchedData(req);
    const id = await utils.isIDGood(reqBody.id);
    res.status(200).json(await db.deleteItem(id, UserModel));
  } catch (error) {
    utils.handleError(res, error);
  }
};
