const express = require('express');

const router = express.Router();

/*
 * Load routes statically and/or dynamically
 */

// Load Auth route
router.use('/', require('./auth'));
router.use('/users', require('./users'));
router.use('/profile', require('./profile'));
router.use('/taxcalculator', require('./taxcalculator'));
router.use('/cities', require('./cities'));
router.use('/states', require('./states'));
router.use('/countries', require('./countries'));
router.use('/wallets', require('./walletRoutes'));
router.use('/payment-provider-settings', require('./paymentProviderSettingsRoutes'));
router.use('/notifications', require('./systemNotificationRoutes'));

/*
 * Setup routes for index
 */
router.get('/', (req, res) => {
  res.render('index');
});

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  });
});

module.exports = router;
