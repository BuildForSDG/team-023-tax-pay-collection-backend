/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const transactionHistorySchema = new Schema(
  {
    sender_name_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reciever_name_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sender_account: { type: String, required: true },
    receiver_account: { type: String, required: true },
    payment_amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    payment_provider: { type: String, required: true },
    payment_id: { type: String, required: true },
    payment_date: { type: Date, required: true, default: Date.now() },
    payment_status: { type: String, required: true }
  },
  {
    collection: 'transactionHistory',
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
transactionHistorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('transactionHistory', transactionHistorySchema);
