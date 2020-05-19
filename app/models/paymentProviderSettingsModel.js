/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const paymentSettingsSchema = new Schema(
  {
    payment_provider: { type: String },
    payment_private_key: { type: String },
    payment_public_key: { type: String },
    payment_status: { type: String },
    payment_organisation_id: {
      type: Schema.Types.ObjectId,
      ref: 'merchantOrganisation'
    },
    payment_user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    collection: 'PaymentProviderSettings',
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

paymentSettingsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PaymentProviderSettings', paymentSettingsSchema);
