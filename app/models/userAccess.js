const mongoose = require('mongoose');
const validator = require('validator');

const UserAccessSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'EMAIL_IS_NOT_VALID'
      },
      lowercase: true,
      required: true
    },
    ip: {
      type: String,
      required: true
    },
    browser: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  {
    collection: 'UserAccess',
    collation: { locale: 'en_US', strength: 1 },
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true
      // transform: (obj, ret) => {}
    }
  }
);
module.exports = mongoose.model('UserAccess', UserAccessSchema);
