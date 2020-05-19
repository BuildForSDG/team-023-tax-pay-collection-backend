/* eslint-disable max-len */
/* eslint-disable consistent-return */
const WalletModel = require('../models/walletModel');

/**
 * WalletController.js
 *
 * @description :: Server-side logic for managing Wallets.
 */
module.exports = {
  /**
   * WalletController.list()
   * *@param
   * @returns
   */
  list: async (req, res) => {
    try {
      const Wallets = await WalletModel.find({});
      if (Wallets) {
        return res.json(Wallets);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting Wallet.',
        error
      });
    }
  },

  /**
   * WalletController.listAll()
   * @param
   * @returns
   */
  listAll: async (req, res) => {
    try {
      const Wallets = await WalletModel.find({});
      if (Wallets) {
        return res.json(Wallets);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting Wallet.',
        error
      });
    }
  },

  /**
   * WalletController.show()
   * @param
   * @returns
   */
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const Wallet = await WalletModel.findOne({ _id: id });

      if (Wallet) {
        return res.json(Wallet);
      }
      return res.status(404).json({
        message: 'No such Wallet'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting Wallet.',
        error
      });
    }
  },

  /**
   * WalletController.create()
   * @param
   * @returns
   */
  create: async (req, res) => {
    try {
      const Wallet = new WalletModel({
        wallet_name: req.body.wallet_name,
        wallet_available_balance: req.body.wallet_available_balance,
        wallet_current_balance: req.body.wallet_current_balance,
        wallet_pin_code: req.body.wallet_pin_code,
        wallet_number: req.body.wallet_number,
        wallet_status: req.body.wallet_status,
        wallet_user: req.body.wallet_user
      });

      const Wallets = await Wallet.save();
      if (Wallets) {
        return res.status(201).json(Wallets);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when creating Wallet',
        error
      });
    }
  },

  /**
   * WalletController.update()
   * @param
   * @returns
   */
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const Wallet = await WalletModel.findOne({ _id: id });

      if (!Wallet) {
        return res.status(404).json({
          message: 'No such Wallet'
        });
      }

      Wallet.wallet_name = req.body.wallet_name ? req.body.wallet_name : Wallet.wallet_name;
      Wallet.wallet_available_balance = req.body.wallet_available_balance
        ? req.body.wallet_available_balance
        : Wallet.wallet_available_balance;
      Wallet.wallet_current_balance = req.body.wallet_current_balance
        ? req.body.wallet_current_balance
        : Wallet.wallet_current_balance;
      Wallet.wallet_pin_code = req.body.wallet_pin_code ? req.body.wallet_pin_code : Wallet.wallet_pin_code;
      Wallet.wallet_number = req.body.wallet_number ? req.body.wallet_number : Wallet.wallet_number;
      Wallet.wallet_status = req.body.wallet_status ? req.body.wallet_status : Wallet.wallet_status;
      Wallet.wallet_user = req.body.wallet_user ? req.body.wallet_user : Wallet.wallet_user;

      const Wallets = await Wallet.save();
      if (Wallets) {
        return res.json(Wallets);
      }
      return res.status(500).json({
        message: 'Error when updating Wallet.',
        error: 'error'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting Wallet',
        error
      });
    }
  },

  /**
   * WalletController.remove()
   */
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const Wallets = await WalletModel.findByIdAndRemove(id);
      if (Wallets) {
        return res.status(204).json();
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when deleting the Wallet.',
        error
      });
    }
  }
};
