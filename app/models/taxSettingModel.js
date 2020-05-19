/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const TaxSettingSchema = new Schema(
  {
    tax_name: { type: String, required: true },
    tax_type: { type: String, required: true },
    tax_low_income_amount: { type: Number, required: true },
    tax_mid_income_lower_amount: { type: Number, required: true },
    tax_mid_income_upper_amount: { type: Number, required: true },
    tax_high_income_amount: { type: Number, required: true },
    tax_low_income_percentage_charge: { type: Number, required: true },
    tax_mid_income_lower_percentage_charge: { type: Number, required: true },
    tax_mid_income_upper_percentage_charge: { type: Number, required: true },
    tax_high_income_percentage_charge: { type: Number, required: true },
    lower_income_minimum: { type: Number, required: true },
    medium_income_minimum: { type: Number, required: true },
    high_income_minimum: { type: Number, required: true },
    tax_city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
      required: true
    },
    tax_state: {
      type: Schema.Types.ObjectId,
      ref: 'State',
      required: true
    },
    tax_country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
      required: true
    },
    tax_organistion_id: {
      type: Schema.Types.ObjectId,
      ref: 'MerchantOrganisation',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    collection: 'TaxSetting',
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
TaxSettingSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('TaxSetting', TaxSettingSchema);
