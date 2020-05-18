/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const CountrySchema = new Schema(
  {
    cnum: { type: Number },
    name: { type: String },
    dial_code: { type: String },
    code: { type: String }
  },
  {
    collection: 'Country',
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

CountrySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Country', CountrySchema);
