const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const merchantOrganisationController = require('../controllers/merchantOrganisationController');

/*
 * GET
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  merchantOrganisationController.list
);

/*
 * GET
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  merchantOrganisationController.show
);

/*
 * POST
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  merchantOrganisationController.create
);

/*
 * PUT
 */
router.put(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  merchantOrganisationController.update
);

/*
 * DELETE
 */
router.delete(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  merchantOrganisationController.remove
);

module.exports = router;
