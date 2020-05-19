const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const pointSettingsController = require('../controllers/pointSettingsController');

/*
 * GET
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  pointSettingsController.list
);

/*
 * GET
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  pointSettingsController.show
);

/*
 * POST
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  pointSettingsController.create
);

/*
 * PUT
 */
router.put(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  pointSettingsController.update
);

/*
 * DELETE
 */
router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  pointSettingsController.remove
);

module.exports = router;
