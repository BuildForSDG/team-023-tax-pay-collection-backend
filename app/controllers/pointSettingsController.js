/* eslint-disable consistent-return */
/* eslint-disable max-len */
const PointSettingsModel = require('../models/pointSettingsModel');

/**
 * pointSettingsController.js
 *
 * @description :: Server-side logic for managing pointSettingss.
 */
module.exports = {
  /**
   * pointSettingsController.list()
   */
  list: async (req, res) => {
    try {
      const pointSettingss = await PointSettingsModel.find({});
      if (pointSettingss) {
        return res.status(200).json(pointSettingss);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting pointSettings.',
        error
      });
    }
  },

  /**
   * pointSettingsController.show()
   */
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const pointSettingss = await PointSettingsModel.findOne({ _id: id });
      if (pointSettingss) {
        return res.status(200).json(pointSettingss);
      }
      return res.status(404).json({
        message: 'No such pointSettings'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting pointSettings.',
        error
      });
    }
  },

  /**
   * pointSettingsController.create()
   */
  create: async (req, res) => {
    try {
      const pointSettings = new PointSettingsModel({
        merchant_id: req.body.merchant_id,
        merchant_organisation_id: req.body.merchant_organisation_id,
        point_name: req.body.point_name,
        point_min_amount: req.body.point_min_amount,
        point_max_amount: req.body.point_max_amount,
        point_min_reward: req.body.point_min_reward,
        point_max_reward: req.body.point_max_reward,
        point_status: req.body.point_status
      });

      const pointSettingss = await pointSettings.save();
      if (pointSettingss) {
        return res.status(201).json(pointSettings);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when creating pointSettings',
        error
      });
    }
  },

  /**
   * pointSettingsController.update()
   */
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const pointSettings = await PointSettingsModel.findOne({ _id: id });

      if (!pointSettings) {
        return res.status(404).json({
          message: 'No such pointSettings'
        });
      }

      pointSettings.merchant_id = req.body.merchant_id ? req.body.merchant_id : pointSettings.merchant_id;
      pointSettings.merchant_organisation_id = req.body.merchant_organisation_id
        ? req.body.merchant_organisation_id
        : pointSettings.merchant_organisation_id;
      pointSettings.point_name = req.body.point_name ? req.body.point_name : pointSettings.point_name;
      pointSettings.point_min_amount = req.body.point_min_amount
        ? req.body.point_min_amount
        : pointSettings.point_min_amount;
      pointSettings.point_max_amount = req.body.point_max_amount
        ? req.body.point_max_amount
        : pointSettings.point_max_amount;
      pointSettings.point_min_reward = req.body.point_min_reward
        ? req.body.point_min_reward
        : pointSettings.point_min_reward;
      pointSettings.point_max_reward = req.body.point_max_reward
        ? req.body.point_max_reward
        : pointSettings.point_max_reward;
      pointSettings.point_status = req.body.point_status ? req.body.point_status : pointSettings.point_status;

      const pointSettingss = await pointSettings.save();
      if (pointSettingss) {
        return res.json(pointSettingss);
      }
      return res.status(500).json({
        message: 'Error when updating pointSettings.',
        error: 'err'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting pointSettings',
        error
      });
    }
  },

  /**
   * pointSettingsController.remove()
   */
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const pointSettingss = await PointSettingsModel.findByIdAndRemove(id);
      if (pointSettingss) {
        return res.status(204).json(pointSettingss);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when deleting the pointSettings.',
        error
      });
    }
  }
};
