const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});
const TransactionInfoController = require('../controllers/transactionInfoController');

/*
 * GET
 */
router.get(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  TransactionInfoController.list
);

/*
 * GET
 */
router.get(
  '/:id',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  TransactionInfoController.show
);

/*
 * POST
 */
router.post(
  '/',
  requireAuth,
  AuthController.roleAuthorization(['merchant', 'admin']),
  trimRequest.all,
  TransactionInfoController.create
);

/*
 * PUT
 */
// router.put('/:id', TransactionInfoController.update);

/*
 * DELETE
 */
// router.delete('/:id', TransactionInfoController.remove);

module.exports = router;
