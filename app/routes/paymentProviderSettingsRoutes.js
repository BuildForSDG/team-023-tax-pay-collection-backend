const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const paymentSettingsController = require('../controllers/paymentProviderSettingsController');

/*
 * GET
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  paymentSettingsController.list
);

/*
 * GET
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  paymentSettingsController.show
);

/*
 * POST
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  paymentSettingsController.create
);

/*
 * PUT
 */
router.put(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  paymentSettingsController.update
);

/*
 * DELETE
 */
router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  paymentSettingsController.remove
);

module.exports = router;
