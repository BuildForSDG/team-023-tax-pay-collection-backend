const validator = require('validator');
const { check } = require('express-validator');
const { validationResult } = require('../middleware/utils');

/**
 * Validates create new item request
 */
exports.createItem = [
  check('frist_name').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  check('last_name').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  check('date_of_birth').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  check('email')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isEmail()
    .withMessage('EMAIL_IS_NOT_VALID'),
  check('password')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      min: 5
    })
    .withMessage('PASSWORD_TOO_SHORT_MIN_5'),
  check('role')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isIn(['user', 'admin'])
    .withMessage('USER_NOT_IN_KNOWN_ROLE'),
  check('phone').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY').trim(),
  check('city').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY').trim(),
  check('state').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY').trim(),
  check('country').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY').trim(),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates update item request
 */
exports.updateItem = [
  check('frist_name').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  check('last_name').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  check('date_of_birth').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  check('email').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  check('role').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  check('phone').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY').trim(),
  check('city').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY').trim(),
  check('state').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY').trim(),
  check('country').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY').trim(),
  check('id').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates get item request
 */
exports.getItem = [
  check('id').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];

/**
 * Validates delete item request
 */
exports.deleteItem = [
  check('id').exists().withMessage('MISSING').not().isEmpty().withMessage('IS_EMPTY'),
  (req, res, next) => {
    validationResult(req, res, next);
  }
];
