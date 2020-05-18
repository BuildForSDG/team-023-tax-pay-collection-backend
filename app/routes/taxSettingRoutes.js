const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const TaxSettingController = require('../controllers/taxSettingController');

/*
 * GET
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  TaxSettingController.list
);

/*
 * GET
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  TaxSettingController.show
);

/*
 * POST
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  TaxSettingController.create
);

/*
 * PUT
 */
router.put(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  TaxSettingController.update
);

/*
 * DELETE
 */
router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  TaxSettingController.remove
);

module.exports = router;
