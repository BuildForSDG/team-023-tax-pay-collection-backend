/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const pointHistorySchema = new Schema(
  {
    transaction_id: { type: String },
    payment_id: { type: String },
    merchant_id: {
      type: Schema.Types.ObjectId,
      ref: 'MerchantOrganisation'
    },
    point_amount: { type: Number },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    collection: 'PointHistory',
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

pointHistorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('PointHistory', pointHistorySchema);
