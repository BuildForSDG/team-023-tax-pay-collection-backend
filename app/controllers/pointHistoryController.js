/* eslint-disable consistent-return */
/* eslint-disable max-len */
const PointHistoryModel = require('../models/pointHistoryModel');

/**
 * pointHistoryController.js
 *
 * @description :: Server-side logic for managing pointHistorys.
 */
module.exports = {
  /**
   * pointHistoryController.list()
   */
  list: async (req, res) => {
    try {
      const pointHistorys = await PointHistoryModel.find();
      if (pointHistorys) {
        return res.json(pointHistorys);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting pointHistory.',
        error
      });
    }
  },

  /**
   * pointHistoryController.show()
   */
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const pointHistorys = await PointHistoryModel.findOne({ _id: id });
      if (pointHistorys) {
        return res.status(200).json(pointHistorys);
      }
      return res.status(404).json({
        message: 'No such pointHistory'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting pointHistory.',
        error
      });
    }
  },

  /**
   * pointHistoryController.create()
   */
  create: async (req, res) => {
    try {
      const pointHistory = new PointHistoryModel({
        transaction_id: req.body.transaction_id,
        payment_id: req.body.payment_id,
        merchant_id: req.body.merchant_id,
        point_amount: req.body.point_amount,
        user_id: req.body.user_id
      });

      const pointHistorys = await pointHistory.save();
      if (pointHistorys) {
        return res.status(201).json(pointHistorys);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when creating pointHistory',
        error
      });
    }
  },

  /**
   * pointHistoryController.update()
   */
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const pointHistory = await PointHistoryModel.findOne({ _id: id });

      if (!pointHistory) {
        return res.status(404).json({
          message: 'No such pointHistory'
        });
      }

      pointHistory.transaction_id = req.body.transaction_id ? req.body.transaction_id : pointHistory.transaction_id;
      pointHistory.payment_id = req.body.payment_id ? req.body.payment_id : pointHistory.payment_id;
      pointHistory.merchant_id = req.body.merchant_id ? req.body.merchant_id : pointHistory.merchant_id;
      pointHistory.point_amount = req.body.point_amount ? req.body.point_amount : pointHistory.point_amount;
      pointHistory.user_id = req.body.user_id ? req.body.user_id : pointHistory.user_id;

      const pointHistorys = await pointHistory.save();
      if (pointHistorys) {
        return res.json(pointHistorys);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when updating pointHistory.',
        error
      });
    }
  },

  /**
   * pointHistoryController.remove()
   */
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const pointHistorys = await PointHistoryModel.findByIdAndRemove(id);
      if (pointHistorys) {
        return res.status(204).json(pointHistorys);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when deleting the pointHistory.',
        error
      });
    }
  }
};
