/* eslint-disable max-len */

'strict';

const utils = require('../middleware/utils');
/**
 * Tax Owed Calculator
 * This rates will be gotten form a database
 * - 0 to 10k is taxed at 0% or specified in the database
 * - 10,001 to 35000 is taxed at 20%
 * - 35,001 to 100,000 is taxed at 40%
 * - 100000+ is taxed at 50%
 */

const LOW_INCOME_AMOUNT_RANGE = 10000;
const MEDIUM_LOWER_INCOME_AMOUNT_RANGE = 10001;
const MEDIUM_UPPER_INCOME_AMOUNT_RANGE = 35001;
const HIGH_INCOME_AMOUNT_RANGE = 100000;
const HIGH_INCOME_AMOUNT_RANGE_PERCENTAGE = 50 / 100;
const MEDIUM_UPPER_INCOME_AMOUNT_RANGE_PERCENTAGE = 40 / 100;
const MEDIUM_LOWER_INCOME_AMOUNT_RANGE_PERCENTAGE = 20 / 100;
const LOW_INCOME_AMOUNT_RANGE_PERCENTAGE = 0;
const LOWER_LIMIT_BRACKET = 24999;
const MIDDLE_LIMIT_BRACKET = 35000;
const UPPER_LIMIT_BRACKET = 64999;

function calcTaxes(income) {
  let tax = 0;
  let taxPrint = '';
  let incomeAfterTax = 0;
  let incomeAfterTaxPrint = '';
  let taxPercentageGroup1 = 0;
  let taxPercentageGroup2 = 0;
  let taxPercentageGroup3 = 0;
  let taxPercentageGroup4 = 0;
  let taxPercentageGroupPrint = '';
  let taxGroup1;
  let taxGroup2 = 0;
  let taxGroup3 = 0;
  let taxGroup5 = 0;
  let taxGroupPrint = '';

  if (income > HIGH_INCOME_AMOUNT_RANGE) {
    tax = (
      (income - HIGH_INCOME_AMOUNT_RANGE) * HIGH_INCOME_AMOUNT_RANGE_PERCENTAGE
      + (HIGH_INCOME_AMOUNT_RANGE - MEDIUM_UPPER_INCOME_AMOUNT_RANGE) * MEDIUM_UPPER_INCOME_AMOUNT_RANGE_PERCENTAGE
      + (MIDDLE_LIMIT_BRACKET - MEDIUM_LOWER_INCOME_AMOUNT_RANGE) * MEDIUM_LOWER_INCOME_AMOUNT_RANGE_PERCENTAGE
    ).toFixed(2);
    taxPrint = `Tax Payable: ${tax}`;
    incomeAfterTax = (income - tax).toFixed(2);
    incomeAfterTaxPrint = `Income After Tax: ${incomeAfterTax}`;
    taxPercentageGroup1 = ((LOW_INCOME_AMOUNT_RANGE / income) * 100).toFixed(1);
    taxPercentageGroup2 = ((LOWER_LIMIT_BRACKET / income) * 100).toFixed(1);
    taxPercentageGroup3 = ((UPPER_LIMIT_BRACKET / income) * 100).toFixed(1);
    taxPercentageGroup4 = (((income - HIGH_INCOME_AMOUNT_RANGE) / income) * 100).toFixed(1);
    taxPercentageGroupPrint = `See your percentage breakdown of income by tax group: ${taxPercentageGroup1}% between 0 to 10000, ${taxPercentageGroup2}% between 10,001 to 35000, ${taxPercentageGroup3}% between 35,001 to 100000 and ${taxPercentageGroup4}% across the 100000+ bracket`;
    taxGroup1 = 0;
    taxGroup2 = (
      (MIDDLE_LIMIT_BRACKET - MEDIUM_LOWER_INCOME_AMOUNT_RANGE)
      * MEDIUM_LOWER_INCOME_AMOUNT_RANGE_PERCENTAGE
    ).toFixed(2);
    taxGroup3 = (
      (HIGH_INCOME_AMOUNT_RANGE - MEDIUM_UPPER_INCOME_AMOUNT_RANGE)
      * MEDIUM_UPPER_INCOME_AMOUNT_RANGE_PERCENTAGE
    ).toFixed(2);
    taxGroup5 = ((income - HIGH_INCOME_AMOUNT_RANGE) * HIGH_INCOME_AMOUNT_RANGE_PERCENTAGE).toFixed(2);
    taxGroupPrint = `and, here is your breakdown of tax paid at each group: ${taxGroup1} at 0%, ${taxGroup2} at 20%, ${taxGroup3} at 40% and ${taxGroup5} at 50%.`;
  } else if (income > MEDIUM_UPPER_INCOME_AMOUNT_RANGE) {
    tax = (
      (income - MEDIUM_UPPER_INCOME_AMOUNT_RANGE) * MEDIUM_UPPER_INCOME_AMOUNT_RANGE_PERCENTAGE
      + (MIDDLE_LIMIT_BRACKET - MEDIUM_LOWER_INCOME_AMOUNT_RANGE) * MEDIUM_LOWER_INCOME_AMOUNT_RANGE_PERCENTAGE
    ).toFixed(2);
    taxPrint = `Tax Payable: ${tax}`;
    incomeAfterTax = (income - tax).toFixed(2);
    incomeAfterTaxPrint = `Income After Tax: ${incomeAfterTax}`;
    taxPercentageGroup1 = ((LOW_INCOME_AMOUNT_RANGE / income) * 100).toFixed(1);
    taxPercentageGroup2 = ((LOWER_LIMIT_BRACKET / income) * 100).toFixed(1);
    taxPercentageGroup3 = (((income - MEDIUM_UPPER_INCOME_AMOUNT_RANGE) / income) * 100).toFixed(1);
    taxPercentageGroupPrint = `See your percentage breakdown of income by tax group: ${taxPercentageGroup1}% between 0 to 10000, ${taxPercentageGroup2}% between 10,001 to 35000 and ${taxPercentageGroup3}% between 35,001 to 100000`;
    taxGroup1 = 0;
    taxGroup2 = (
      (MIDDLE_LIMIT_BRACKET - MEDIUM_LOWER_INCOME_AMOUNT_RANGE)
      * MEDIUM_LOWER_INCOME_AMOUNT_RANGE_PERCENTAGE
    ).toFixed(2);
    taxGroup3 = ((income - MEDIUM_UPPER_INCOME_AMOUNT_RANGE) * MEDIUM_UPPER_INCOME_AMOUNT_RANGE_PERCENTAGE).toFixed(2);
    taxGroupPrint = `and, here is your breakdown of tax paid at each group: ${taxGroup1} at 0%, ${taxGroup2} at 20% and ${taxGroup3} at 40%.`;
  } else if (income > MEDIUM_LOWER_INCOME_AMOUNT_RANGE) {
    tax = ((income - MEDIUM_LOWER_INCOME_AMOUNT_RANGE) * MEDIUM_LOWER_INCOME_AMOUNT_RANGE_PERCENTAGE).toFixed(2);
    taxPrint = `Tax Payable: ${tax}`;
    incomeAfterTax = (income - tax).toFixed(2);
    incomeAfterTaxPrint = `Income After Tax: ${incomeAfterTax}`;
    taxPercentageGroup1 = ((LOW_INCOME_AMOUNT_RANGE / income) * 100).toFixed(1);
    taxPercentageGroup2 = (((income - MEDIUM_LOWER_INCOME_AMOUNT_RANGE) / income) * 100).toFixed(1);
    taxPercentageGroupPrint = `See your percentage breakdown of income by tax group: ${taxPercentageGroup1}% between 0 to 10000 and ${taxPercentageGroup2}% between 10,001 to 35000`;
    taxGroup1 = 0;
    taxGroup2 = ((income - MEDIUM_LOWER_INCOME_AMOUNT_RANGE) * MEDIUM_LOWER_INCOME_AMOUNT_RANGE_PERCENTAGE).toFixed(2);
    taxGroupPrint = `and, here is your breakdown of tax paid at each group: ${taxGroup1} at 0% and ${taxGroup2} at 20%.`;
  } else if (income > 0) {
    tax = income * LOW_INCOME_AMOUNT_RANGE_PERCENTAGE;
    taxPrint = `Tax Payable: ${tax}`;
    incomeAfterTax = (income - tax).toFixed(2);
    incomeAfterTaxPrint = `Income After Tax: ${incomeAfterTax}`;
    taxPercentageGroup1 = 100;
    taxPercentageGroupPrint = `See your percentage breakdown of income by tax group: ${taxPercentageGroup1}% between 0 to 10000`;
    taxGroup1 = 0;
    taxGroupPrint = `and, here is your breakdown of tax paid at each group: ${taxGroup1} at 0%.`;
  } else {
    taxPrint = 'Tax Payable: n/a';
    incomeAfterTaxPrint = 'Income After Tax: n/a';
    taxPercentageGroupPrint = ' n/a';
    taxGroupPrint = ' n/a';
    tax = 0;
  }
  return [taxPrint, incomeAfterTaxPrint, taxPercentageGroupPrint, taxGroupPrint, tax];
}

/**
 * Get items function called by route
 * @param {Object} req - request object income, state or organisation_id
 * @param {Object} res - response object
 */

exports.calculateTax = async (req, res) => {
  try {
    const income = parseFloat(req.body.income);
    const taxCalculated = calcTaxes(income);

    res.status(200).json(taxCalculated);
  } catch (error) {
    utils.handleError(res, error);
  }
};
