const TransactionInfoModel = require("../models/TransactionInfoModel");

/**
 * TransactionInfoController.js
 *
 * @description :: Server-side logic for managing TransactionInfos.
 */
module.exports = {
  /**
   * TransactionInfoController.list()
   */
  list: async (req, res) => {
    try {
      const TransactionInfo = await TransactionInfoModel.find();
      if (TransactionInfo) {
        return res.json(TransactionInfo);
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error when getting TransactionInfo.",
        error: error,
      });
    }
  },

  /**
   * TransactionInfoController.show()
   */
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const TransactionInfo = await TransactionInfoModel.findOne({ _id: id });
      if (err) {
        return res.status(200).json(TransactionInfo);
      } else {
        return res.status(404).json({
          message: "No such TransactionInfo",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error when getting TransactionInfo.",
        error: error,
      });
    }
  },

  /**
   * TransactionInfoController.create()
   */
  create: async (req, res) => {
    try {
      const TransactionInfo = new TransactionInfoModel({
        transaction_id: req.body.transaction_id,
        transaction_status: req.body.transaction_status,
        transaction_details: req.body.transaction_details,
        user: req.body.user,
      });

      const TransactionInfos = await TransactionInfo.save();
      if (TransactionInfos) {
        return res.status(201).json(TransactionInfos);
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error when creating TransactionInfo",
        error: error,
      });
    }
  },

  /**
   * TransactionInfoController.update()
   */
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const TransactionInfo = await TransactionInfoModel.findOne({ _id: id });

      if (!TransactionInfo) {
        return res.status(404).json({
          message: "No such TransactionInfo",
        });
      }

      TransactionInfo.transaction_id = req.body.transaction_id
        ? req.body.transaction_id
        : TransactionInfo.transaction_id;
      TransactionInfo.transaction_status = req.body.transaction_status
        ? req.body.transaction_status
        : TransactionInfo.transaction_status;
      TransactionInfo.transaction_details = req.body.transaction_details
        ? req.body.transaction_details
        : TransactionInfo.transaction_details;
      TransactionInfo.user = req.body.user
        ? req.body.user
        : TransactionInfo.user;

      const TransactionInfos = await TransactionInfo.save();
      if (TransactionInfos) {
        return res.status(200).json(TransactionInfos);
      } else {
        return res.status(500).json({
          message: "Error when updating TransactionInfo.",
          error: err,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error when getting TransactionInfo",
        error: error,
      });
    }
  },

  /**
   * TransactionInfoController.remove()
   */
  remove: async (req, res) => {
    try {
      const id = req.params.id;
      const TransactionInfo = await TransactionInfoModel.findByIdAndRemove(id);
      if (TransactionInfo) {
        return res.status(204).json(TransactionInfo);
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error when deleting the TransactionInfo.",
        error: error,
      });
    }
  },
};
