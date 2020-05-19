const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const pointHistoryController = require('../controllers/pointHistoryController');

/*
 * GET
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  pointHistoryController.list
);

/*
 * GET
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  pointHistoryController.show
);

/*
 * POST
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['user', 'merchant', 'admin']),
  trimRequest.all,
  pointHistoryController.create
);

/*
 * PUT
 */
// router.put(
//   "/:id",
//   requireAuth,
//   AuthController.roleAuthorization(["user", "merchant", "admin"]),
//   trimRequest.all,
//   pointHistoryController.update
// );

/*
 * DELETE
 */
// router.delete(
//   "/:id",
//   requireAuth,
//   AuthController.roleAuthorization(["user", "merchant", "admin"]),
//   trimRequest.all,
//   pointHistoryController.remove
// );

module.exports = router;
