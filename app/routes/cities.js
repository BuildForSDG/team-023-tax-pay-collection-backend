
const express = require('express');
const trimRequest = require('trim-request');
const passport = require('passport');
const controller = require('../controllers/cities');
const AuthController = require('../controllers/auth');

const router = express.Router();
require('../../config/passport');

const requireAuth = passport.authenticate('jwt', {
  session: false
});

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/listAll', controller.listAll);
router.post('/', requireAuth, AuthController.roleAuthorization(['admin']), trimRequest.all, controller.create);
router.put('/:id', requireAuth, AuthController.roleAuthorization(['admin']), trimRequest.all, controller.update);
router.patch('/:id', requireAuth, AuthController.roleAuthorization(['admin']), trimRequest.all, controller.update);
router.delete('/:id', requireAuth, AuthController.roleAuthorization(['admin']), trimRequest.all, controller.destroy);

module.exports = router;
