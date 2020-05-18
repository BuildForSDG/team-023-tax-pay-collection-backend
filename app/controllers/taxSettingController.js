/* eslint-disable consistent-return */
/* eslint-disable max-len */
const TaxSettingModel = require('../models/taxSettingModel');

/**
 * TaxSettingController.js
 *
 * @description :: Server-side logic for managing TaxSettings.
 */
module.exports = {
  /**
   * TaxSettingController.list()
   */
  list: async (req, res) => {
    try {
      const TaxSettings = await TaxSettingModel.find({});
      if (TaxSettings) {
        return res.json(TaxSettings);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting TaxSetting.',
        error
      });
    }
  },

  /**
   * merchantOnly
   * TaxSettingController.listAll()
   */
  listAll: async (req, res) => {
    try {
      const TaxSettings = await TaxSettingModel.find();
      if (TaxSettings) {
        return res.json(TaxSettings);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting TaxSetting.',
        error
      });
    }
  },

  /**
   * TaxSettingController.show()
   */
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const TaxSetting = await TaxSettingModel.findOne({ _id: id });
      if (TaxSetting) {
        return res.status(200).json(TaxSetting);
      }
      return res.status(404).json({
        message: 'No such TaxSetting'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting TaxSetting.',
        error
      });
    }
  },

  /**
   * TaxSettingController.create()
   */
  create: async (req, res) => {
    try {
      const TaxSetting = new TaxSettingModel({
        tax_name: req.body.tax_name,
        tax_type: req.body.tax_type,
        tax_low_income_amount: req.body.tax_low_income_amount,
        tax_mid_income_lower_amount: req.body.tax_mid_income_lower_amount,
        tax_mid_income_upper_amount: req.body.tax_mid_income_upper_amount,
        tax_high_income_amount: req.body.tax_high_income_amount,
        tax_low_income_percentage_charge: req.body.tax_low_income_percentage_charge,
        tax_mid_income_lower_percentage_charge: req.body.tax_mid_income_lower_percentage_charge,
        tax_mid_income_upper_percentage_charge: req.body.tax_mid_income_upper_percentage_charge,
        tax_high_income_percentage_charge: req.body.tax_high_income_percentage_charge,
        lower_income_minimum: req.body.lower_income_minimum,
        medium_income_minimum: req.body.medium_income_minimum,
        high_income_minimum: req.body.high_income_minimum,
        tax_city: req.body.tax_city,
        tax_state: req.body.tax_state,
        tax_country: req.body.tax_country,
        tax_organistion_id: req.body.tax_organistion_id,
        user: req.body.user
      });

      const newTaxSetting = await TaxSetting.save();
      if (newTaxSetting) {
        return res.status(201).json(TaxSetting);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when creating TaxSetting',
        error
      });
    }
  },

  /**
   * TaxSettingController.update()
   */
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const TaxSetting = await TaxSettingModel.findOne({ _id: id });

      if (!TaxSetting) {
        return res.status(404).json({
          message: 'No such TaxSetting'
        });
      }

      TaxSetting.tax_name = req.body.tax_name ? req.body.tax_name : TaxSetting.tax_name;
      TaxSetting.tax_type = req.body.tax_type ? req.body.tax_type : TaxSetting.tax_type;
      TaxSetting.tax_low_income_amount = req.body.tax_low_income_amount
        ? req.body.tax_low_income_amount
        : TaxSetting.tax_low_income_amount;
      TaxSetting.tax_mid_income_lower_amount = req.body.tax_mid_income_lower_amount
        ? req.body.tax_mid_income_lower_amount
        : TaxSetting.tax_mid_income_lower_amount;
      TaxSetting.tax_mid_income_upper_amount = req.body.tax_mid_income_upper_amount
        ? req.body.tax_mid_income_upper_amount
        : TaxSetting.tax_mid_income_upper_amount;
      TaxSetting.tax_high_income_amount = req.body.tax_high_income_amount
        ? req.body.tax_high_income_amount
        : TaxSetting.tax_high_income_amount;
      TaxSetting.tax_low_income_percentage_charge = req.body.tax_low_income_percentage_charge
        ? req.body.tax_low_income_percentage_charge
        : TaxSetting.tax_low_income_percentage_charge;
      TaxSetting.tax_mid_income_lower_percentage_charge = req.body.tax_mid_income_lower_percentage_charge
        ? req.body.tax_mid_income_lower_percentage_charge
        : TaxSetting.tax_mid_income_lower_percentage_charge;
      TaxSetting.tax_mid_income_upper_percentage_charge = req.body.tax_mid_income_upper_percentage_charge
        ? req.body.tax_mid_income_upper_percentage_charge
        : TaxSetting.tax_mid_income_upper_percentage_charge;
      TaxSetting.tax_high_income_percentage_charge = req.body.tax_high_income_percentage_charge
        ? req.body.tax_high_income_percentage_charge
        : TaxSetting.tax_high_income_percentage_charge;
      TaxSetting.lower_income_minimum = req.body.lower_income_minimum
        ? req.body.lower_income_minimum
        : TaxSetting.lower_income_minimum;
      TaxSetting.medium_income_minimum = req.body.medium_income_minimum
        ? req.body.medium_income_minimum
        : TaxSetting.medium_income_minimum;
      TaxSetting.high_income_minimum = req.body.high_income_minimum
        ? req.body.high_income_minimum
        : TaxSetting.high_income_minimum;
      TaxSetting.tax_city = req.body.tax_city ? req.body.tax_city : TaxSetting.tax_city;
      TaxSetting.tax_state = req.body.tax_state ? req.body.tax_state : TaxSetting.tax_state;
      TaxSetting.tax_country = req.body.tax_country ? req.body.tax_country : TaxSetting.tax_country;
      TaxSetting.tax_organistion_id = req.body.tax_organistion_id
        ? req.body.tax_organistion_id
        : TaxSetting.tax_organistion_id;
      TaxSetting.user = req.body.user ? req.body.user : TaxSetting.user;

      const updated = await TaxSetting.save();
      if (updated) {
        return res.status(200).json(TaxSetting);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting TaxSetting',
        error
      });
    }
  },

  /**
   * TaxSettingController.remove()
   */
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const delTaxSettings = await TaxSettingModel.findByIdAndRemove(id);
      if (delTaxSettings) {
        return res.status(204).json(delTaxSettings);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when deleting the TaxSetting.',
        error
      });
    }
  }
};
