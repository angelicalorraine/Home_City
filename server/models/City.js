const { Schema } = require('mongoose');

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // saved book id from teleport
  cityId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  healthcare: {
    type: Number,
  },
  taxation: {
    type: Number,
  },
  education: {
    type: Number,
  },
  housing: {
    type: Number,
  },
  costOfLiving: {
    type: Number,
  },
  safety: {
    type: Number,
  },
  environmentalQuality: {
    type: Number,
  },
  economy: {
    type: Number,
  },
  population: {
    type: Number,
  },
  region: {
    type: String,
  },
});

module.exports = citySchema;