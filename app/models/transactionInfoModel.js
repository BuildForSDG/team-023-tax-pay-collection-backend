/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const TransactionInfoSchema = new Schema(
  {
    transaction_id: { type: String, required: true },
    transaction_status: { type: String, required: true },
    transaction_details: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    collection: 'TransactionInfo',
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

TransactionInfoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('TransactionInfo', TransactionInfoSchema);
