const express = require('express');
const trimRequest = require('trim-request');
const validate = require('../controllers/taxcalculator.validate');
const taxcalculator = require('../controllers/taxcalculator');

const router = express.Router();
/*
 * Register route
 *
 */
router.post('/calc', trimRequest.all, validate.checkIncome, taxcalculator.calculateTax);
module.exports = router;
