/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const WalletSchema = new Schema(
  {
    wallet_name: { type: String },
    wallet_available_balance: { type: Number, default: 0 },
    wallet_current_balance: { type: Number, default: 0 },
    wallet_pin_code: { type: String },
    wallet_number: { type: String },
    wallet_status: { type: String },
    wallet_user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    collection: 'Wallet',
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

WalletSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Wallet', WalletSchema);
