/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const systemNotificationSchema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reciever_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    notification_message: { type: String, required: true },
    nofification_type: { type: String, required: true },
    notification_status: { type: String, required: true },
    delivery_status: { type: String, required: true }
  },
  {
    collection: 'SystemNotification',
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

systemNotificationSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('SystemNotification', systemNotificationSchema);
