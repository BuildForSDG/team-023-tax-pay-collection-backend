/* eslint-disable consistent-return */
/* eslint-disable max-len */
const TransactionHistoryModel = require('../models/transactionHistoryModel');

/**
 * transactionHistoryController.js
 *
 * @description :: Server-side logic for managing transactionHistorys.
 */

/**
 * transactionHistoryController.list()
 */
exports.list = async (req, res) => {
  try {
    const transactionHistorys = await TransactionHistoryModel.find({});
    if (transactionHistorys) {
      return res.json(transactionHistorys);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting transactionHistory.',
      error
    });
  }
};

/**
 * merchantOnly
 * transactionHistoryController.listAll()
 */
exports.listAll = async (req, res) => {
  try {
    const transactionHistorys = await TransactionHistoryModel.find({});
    if (transactionHistorys) {
      return res.json(transactionHistorys);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting transactionHistory.',
      error
    });
  }
};

/**
 * transactionHistoryController.show()
 */
exports.show = async (req, res) => {
  try {
    const { id } = req.params;
    const transactionHistorys = await TransactionHistoryModel.findOne({
      _id: id
    });
    if (transactionHistorys) {
      return res.status(200).json(transactionHistorys);
    }
    return res.status(404).json({
      message: 'No such transactionHistory'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting transactionHistory.',
      error
    });
  }
};

/**
 * transactionHistoryController.create()
 */
exports.create = async (req, res) => {
  try {
    const transactionHistory = new TransactionHistoryModel({
      sender_name_id: req.body.sender_name_id,
      reciever_name_id: req.body.reciever_name_id,
      sender_account: req.body.sender_account,
      receiver_account: req.body.receiver_account,
      payment_amount: req.body.payment_amount,
      payment_method: req.body.payment_method,
      payment_provider: req.body.payment_provider,
      payment_id: req.body.payment_id,
      payment_date: req.body.payment_date,
      payment_status: req.body.payment_status
    });

    const transactionHistorys = await transactionHistory.save();
    if (transactionHistorys) {
      return res.status(201).json(transactionHistorys);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when creating transactionHistory',
      error
    });
  }
};

/**
 * transactionHistoryController.update()
 */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const transactionHistory = await TransactionHistoryModel.findOne({
      _id: id
    });

    if (!transactionHistory) {
      return res.status(404).json({
        message: 'No such transactionHistory'
      });
    }

    transactionHistory.sender_name_id = req.body.sender_name_id
      ? req.body.sender_name_id
      : transactionHistory.sender_name_id;
    transactionHistory.reciever_name_id = req.body.reciever_name_id
      ? req.body.reciever_name_id
      : transactionHistory.reciever_name_id;
    transactionHistory.sender_account = req.body.sender_account
      ? req.body.sender_account
      : transactionHistory.sender_account;
    transactionHistory.receiver_account = req.body.receiver_account
      ? req.body.receiver_account
      : transactionHistory.receiver_account;
    transactionHistory.payment_amount = req.body.payment_amount
      ? req.body.payment_amount
      : transactionHistory.payment_amount;
    transactionHistory.payment_method = req.body.payment_method
      ? req.body.payment_method
      : transactionHistory.payment_method;
    transactionHistory.payment_provider = req.body.payment_provider
      ? req.body.payment_provider
      : transactionHistory.payment_provider;
    transactionHistory.payment_id = req.body.payment_id ? req.body.payment_id : transactionHistory.payment_id;
    transactionHistory.payment_date = req.body.payment_date ? req.body.payment_date : transactionHistory.payment_date;
    transactionHistory.payment_status = req.body.payment_status
      ? req.body.payment_status
      : transactionHistory.payment_status;

    const transactionHistorys = await transactionHistory.save();
    if (transactionHistorys) {
      return res.status(200).json(transactionHistorys);
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when getting transactionHistory',
      error
    });
  }
};

/**
 * transactionHistoryController.remove()
 */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const transactionHistory = await TransactionHistoryModel.findByIdAndRemove(id);
    if (transactionHistory) {
      return res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error when deleting the transactionHistory.',
      error
    });
  }
};
