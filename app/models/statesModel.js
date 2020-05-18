/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const RegionSchema = new Schema(
  {
    rid: {
      type: Number
    },
    name: {
      type: String
    },
    code: {
      type: String
    },
    country_id: {
      type: Number
    }
  },
  {
    collection: 'State',
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
// RegionSchema.options.autoIndex = true;
RegionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('State', RegionSchema);
