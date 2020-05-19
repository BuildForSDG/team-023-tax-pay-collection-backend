/* eslint-disable consistent-return */
const PaymentSettingsModel = require('../models/paymentProviderSettingsModel');

/**
 * paymentSettingsController.js
 *
 * @description :: Server-side logic for managing paymentSettingss.
 */
module.exports = {
  /**
   * paymentSettingsController.list()
   */
  list: async (req, res) => {
    try {
      const paymentSettings = await PaymentSettingsModel.find();
      if (paymentSettings) {
        return res.json(paymentSettings);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting paymentSettings.',
        error
      });
    }
  },

  /**
   * paymentSettingsController.list()
   */
  listAll: async (req, res) => {
    try {
      const paymentSettings = await PaymentSettingsModel.find();
      if (paymentSettings) {
        return res.json(paymentSettings);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting paymentSettings.',
        error
      });
    }
  },

  /**
   * paymentSettingsController.show()
   */
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const paymentSettings = await PaymentSettingsModel.findOne({ _id: id });
      if (paymentSettings) {
        return res.json(paymentSettings);
      }
      return res.status(404).json({
        message: 'No such paymentSettings'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting paymentSettings.',
        error
      });
    }
  },

  /**
   * paymentSettingsController.create()
   */
  create: async (req, res) => {
    try {
      const paymentSettings = new PaymentSettingsModel({
        payment_provider: req.body.payment_provider,
        payment_private_key: req.body.payment_private_key,
        payment_public_key: req.body.payment_public_key,
        payment_status: req.body.payment_status,
        payment_organisation_id: req.body.payment_organisation_id,
        payment_user_id: req.body.payment_user_id
      });

      const paymentSetting = await paymentSettings.save();
      if (paymentSetting) {
        return res.status(201).json(paymentSetting);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when creating paymentSettings',
        error
      });
    }
  },

  /**
   * paymentSettingsController.update()
   */
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const paymentSettings = await PaymentSettingsModel.findOne({ _id: id });

      if (!paymentSettings) {
        return res.status(404).json({
          message: 'No such paymentSettings'
        });
      }

      paymentSettings.payment_provider = req.body.payment_provider
        ? req.body.payment_provider
        : paymentSettings.payment_provider;
      paymentSettings.payment_private_key = req.body.payment_private_key
        ? req.body.payment_private_key
        : paymentSettings.payment_private_key;
      paymentSettings.payment_public_key = req.body.payment_public_key
        ? req.body.payment_public_key
        : paymentSettings.payment_public_key;
      paymentSettings.payment_status = req.body.payment_status
        ? req.body.payment_status
        : paymentSettings.payment_status;
      paymentSettings.payment_organisation_id = req.body.payment_organisation_id
        ? req.body.payment_organisation_id
        : paymentSettings.payment_organisation_id;
      paymentSettings.payment_user_id = req.body.payment_user_id
        ? req.body.payment_user_id
        : paymentSettings.payment_user_id;

      const paymentSetting = await paymentSettings.save();
      if (paymentSetting) {
        return res.status(200).json(paymentSetting);
      }
      return res.status(500).json({
        message: 'Error when updating paymentSettings.',
        error: 'err'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting paymentSettings',
        error
      });
    }
  },

  /**
   * paymentSettingsController.remove()
   */
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const paymentSettings = await PaymentSettingsModel.findByIdAndRemove(id);
      if (paymentSettings) {
        return res.status(204).json();
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when deleting the paymentSettings.',
        error
      });
    }
  }
};
