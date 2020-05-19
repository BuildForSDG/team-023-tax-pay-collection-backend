/* eslint-disable max-len */
/* eslint-disable consistent-return */
const MerchantOrganisationModel = require('../models/merchantOrganisationModel');

/**
 * merchantOrganisationController.js
 *
 * @description :: Server-side logic for managing merchantOrganisations.
 */
module.exports = {
  /**
   * merchantOrganisationController.list()
   */
  list: async (req, res) => {
    try {
      const merchantOrganisations = await MerchantOrganisationModel.find();
      if (merchantOrganisations) {
        return res.json(merchantOrganisations);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting merchantOrganisation.',
        error
      });
    }
  },

  /**
   * merchantOnly
   * merchantOrganisationController.list()
   */
  listAll: async (req, res) => {
    try {
      const merchantOrganisations = await MerchantOrganisationModel.find();
      if (merchantOrganisations) {
        return res.json(merchantOrganisations);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting merchantOrganisation.',
        error
      });
    }
  },

  /**
   * merchantOrganisationController.show()
   */
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const merchantOrganisation = await MerchantOrganisationModel.findOne({
        _id: id
      });
      if (merchantOrganisation) {
        return res.json(merchantOrganisation);
      }
      return res.status(404).json({
        message: 'No such merchantOrganisation'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting merchantOrganisation.',
        error
      });
    }
  },

  /**
   * merchantOrganisationController.create()
   */
  create: async (req, res) => {
    try {
      const merchantOrganisation = new MerchantOrganisationModel({
        organisation_name: req.body.organisation_name,
        organisation_address: req.body.organisation_address,
        organisation_city: req.body.organisation_city,
        organisation_state: req.body.organisation_state,
        organisation_country: req.body.organisation_country,
        organisation_phone: req.body.organisation_phone,
        organisation_email: req.body.organisation_email,
        organisation_account_number: req.body.organisation_account_number,
        organisation_bank_name: req.body.organisation_bank_name,
        organisation_website: req.body.organisation_website,
        organisation_logo: req.body.organisation_logo,
        organisation_status: req.body.organisation_status,
        organisation_location: req.body.organisation_location,
        merchant_id: req.body.merchant_id
      });

      const newMerchantOrganisation = await merchantOrganisation.save();
      if (newMerchantOrganisation) {
        return res.status(201).json(merchantOrganisation);
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when creating merchantOrganisation',
        error
      });
    }
  },

  /**
   * merchantOrganisationController.update()
   */
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const merchantOrganisation = await MerchantOrganisationModel.findOne({
        _id: id
      });

      if (!merchantOrganisation) {
        return res.status(404).json({
          message: 'No such merchantOrganisation'
        });
      }

      merchantOrganisation.organisation_name = req.body.organisation_name
        ? req.body.organisation_name
        : merchantOrganisation.organisation_name;
      merchantOrganisation.organisation_address = req.body.organisation_address
        ? req.body.organisation_address
        : merchantOrganisation.organisation_address;
      merchantOrganisation.organisation_city = req.body.organisation_city
        ? req.body.organisation_city
        : merchantOrganisation.organisation_city;
      merchantOrganisation.organisation_state = req.body.organisation_state
        ? req.body.organisation_state
        : merchantOrganisation.organisation_state;
      merchantOrganisation.organisation_country = req.body.organisation_country
        ? req.body.organisation_country
        : merchantOrganisation.organisation_country;
      merchantOrganisation.organisation_phone = req.body.organisation_phone
        ? req.body.organisation_phone
        : merchantOrganisation.organisation_phone;
      merchantOrganisation.organisation_email = req.body.organisation_email
        ? req.body.organisation_email
        : merchantOrganisation.organisation_email;
      merchantOrganisation.organisation_account_number = req.body.organisation_account_number
        ? req.body.organisation_account_number
        : merchantOrganisation.organisation_account_number;
      merchantOrganisation.organisation_bank_name = req.body.organisation_bank_name
        ? req.body.organisation_bank_name
        : merchantOrganisation.organisation_bank_name;
      merchantOrganisation.organisation_website = req.body.organisation_website
        ? req.body.organisation_website
        : merchantOrganisation.organisation_website;
      merchantOrganisation.organisation_logo = req.body.organisation_logo
        ? req.body.organisation_logo
        : merchantOrganisation.organisation_logo;
      merchantOrganisation.organisation_status = req.body.organisation_status
        ? req.body.organisation_status
        : merchantOrganisation.organisation_status;
      merchantOrganisation.organisation_location = req.body.organisation_location
        ? req.body.organisation_location
        : merchantOrganisation.organisation_location;
      merchantOrganisation.merchant_id = req.body.merchant_id ? req.body.merchant_id : merchantOrganisation.merchant_id;

      const updated = await merchantOrganisation.save();
      if (updated) {
        return res.json(merchantOrganisation);
      }
      return res.status(500).json({
        message: 'Error when updating merchantOrganisation.',
        error: 'eror'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error when getting merchantOrganisation',
        error
      });
    }
  },

  /**
   * merchantOrganisationController.remove()
   */
  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const merchantOrganisation = await MerchantOrganisationModel.findByIdAndRemove(id);
      if (merchantOrganisation) {
        return res.status(204).json();
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error when deleting the merchantOrganisation.',
        error
      });
    }
  }
};
