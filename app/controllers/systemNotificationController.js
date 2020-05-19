/* eslint-disable max-len */
/* eslint-disable consistent-return */
const SystemNotificationModel = require('../models/systemNotificationModel');

/**
 * systemNotificationController.js
 *
 * @description :: Server-side logic for managing systemNotifications.
 */
module.exports = {
  /**
   * systemNotificationController.list()
   */
  list: async (req, res) => {
    try {
      const systemNotifications = await SystemNotificationModel.find();
      if (systemNotifications) {
        return res.json(systemNotifications);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting systemNotification.',
        error
      });
    }
  },

  /**
   * systemNotificationController.listAll()
   */
  listAll: async (req, res) => {
    try {
      const systemNotifications = await SystemNotificationModel.find();
      if (systemNotifications) {
        return res.json(systemNotifications);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting systemNotification.',
        error
      });
    }
  },

  /**
   * systemNotificationController.show()
   */
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const systemNotification = await SystemNotificationModel.findOne({
        _id: id
      });

      if (systemNotification) {
        return res.json(systemNotification);
      }
      return res.status(404).json({
        message: 'No such systemNotification'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting systemNotification.',
        error
      });
    }
  },

  /**
   * systemNotificationController.create()
   */
  create: async (req, res) => {
    try {
      const systemNotification = new SystemNotificationModel({
        sender_id: req.body.sender_id,
        reciever_id: req.body.reciever_id,
        notification_message: req.body.notification_message,
        nofification_type: req.body.nofification_type,
        notification_status: req.body.notification_status,
        delivery_status: req.body.delivery_status
      });

      const systemNotifications = await systemNotification.save();
      if (systemNotifications) {
        return res.status(201).json(systemNotifications);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when creating systemNotification',
        error
      });
    }
  },

  /**
   * systemNotificationController.update()
   */
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const systemNotification = await SystemNotificationModel.findOne({
        _id: id
      });

      if (!systemNotification) {
        return res.status(404).json({
          message: 'No such systemNotification'
        });
      }

      systemNotification.sender_id = req.body.sender_id ? req.body.sender_id : systemNotification.sender_id;
      systemNotification.reciever_id = req.body.reciever_id ? req.body.reciever_id : systemNotification.reciever_id;
      systemNotification.notification_message = req.body.notification_message
        ? req.body.notification_message
        : systemNotification.notification_message;
      systemNotification.nofification_type = req.body.nofification_type
        ? req.body.nofification_type
        : systemNotification.nofification_type;
      systemNotification.notification_status = req.body.notification_status
        ? req.body.notification_status
        : systemNotification.notification_status;
      systemNotification.delivery_status = req.body.delivery_status
        ? req.body.delivery_status
        : systemNotification.delivery_status;

      const systemNotifications = await systemNotification.save();
      if (systemNotifications) {
        return res.json(systemNotifications);
      }
      return res.status(500).json({
        message: 'Error when updating systemNotification.',
        error: 'error'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting systemNotification',
        error
      });
    }
  },

  /**
   * systemNotificationController.remove()
   */
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const systemNotifications = await SystemNotificationModel.findByIdAndRemove(id);
      if (systemNotifications) {
        return res.status(204).json();
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when deleting the systemNotification.',
        error
      });
    }
  }
};
