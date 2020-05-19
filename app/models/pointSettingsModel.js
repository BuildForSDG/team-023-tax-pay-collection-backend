/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const pointSettingsSchema = new Schema(
  {
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    merchant_organisation_id: {
      type: Schema.Types.ObjectId,
      ref: 'MerchantOrganisation',
      required: true
    },
    point_name: { type: String, required: true },
    point_min_amount: { type: Number, required: true },
    point_max_amount: { type: Number, required: true },
    point_min_reward: { type: Number, required: true },
    point_max_reward: { type: Number, required: true },
    point_status: { type: String, required: true }
  },
  {
    collection: 'PointSettings',
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

pointSettingsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PointSettings', pointSettingsSchema);
