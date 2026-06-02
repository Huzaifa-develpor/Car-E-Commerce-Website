const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
{
  carName: {
    type: String,
    required: true,
    trim: true
  },

  brandName: {
    type: String,
    required: true,
    trim: true
  },

  year: {
    type: Number,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  mileage: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true,
trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  thumbnail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "deactivate"],
    default: "active"
  }
},

{
  timestamps: true
}
);

const carModel = mongoose.model("cars", CarSchema);

module.exports = carModel;