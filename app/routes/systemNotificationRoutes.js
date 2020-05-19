const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const systemNotificationController = require('../controllers/systemNotificationController');

/*
 * GET
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  systemNotificationController.list
);

/*
 * GET
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  systemNotificationController.show
);

/*
 * POST
 */
// router.post('/',  requireAuth,
// AuthController.roleAuthorization(["user", "merchant", "admin"]),
// trimRequest.all,systemNotificationController.create);

/*
 * PUT
 */
// router.put('/:id', requireAuth,
// AuthController.roleAuthorization(["user", "merchant", "admin"]),
// trimRequest.all, systemNotificationController.update);

/*
 * DELETE
 */
// router.delete('/:id', requireAuth,
// AuthController.roleAuthorization(["user", "merchant", "admin"]),
// trimRequest.all, systemNotificationController.remove);

module.exports = router;
