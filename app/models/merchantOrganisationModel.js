/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const merchantOrganisationSchema = new Schema(
  {
    organisation_name: { type: String, required: true },
    organisation_address: { type: String, required: true },
    organisation_city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },
    organisation_state: {
      type: Schema.Types.ObjectId,
      ref: 'State',
      required: true
    },
    organisation_country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    organisation_phone: { type: String, required: true },
    organisation_email: { type: String },
    organisation_account_number: { type: Number, required: true },
    organisation_bank_name: { type: String, required: true },
    organisation_website: { type: String },
    organisation_logo: { type: String },
    organisation_status: { type: String, required: true },
    organisation_location: { type: String },
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    collection: 'MerchantOrganisation',
    collation: { locale: 'en_US', strength: 1 },
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

merchantOrganisationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('MerchantOrganisation', merchantOrganisationSchema);
