const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const transactionHistoryController = require('../controllers/transactionHistoryController');

/*
 * GET
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  transactionHistoryController.list
);

/*
 * GET
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  transactionHistoryController.show
);

/*
 * POST
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  transactionHistoryController.create
);

/*
 * PUT
 */
router.put(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  transactionHistoryController.update
);

/*
 * DELETE
 */
router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['admin']),
  trimRequest.all,
  transactionHistoryController.remove
);

module.exports = router;
