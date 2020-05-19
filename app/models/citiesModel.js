/* eslint-disable no-underscore-dangle */

const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const CitySchema = new Schema(
  {
    region_id: { type: Number },
    country_id: { type: Number },
    name: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
  },
  {
    collection: 'City',
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

CitySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('City', CitySchema);
