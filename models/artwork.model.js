const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  adressStreet: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 3
  },
  zipCode: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 3
  },
  city: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 5
  },
  photoFileName: {
    type: String,
    required: true
  },
  isActivated: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  }
  // country_id: {
  //   type: Schema.Types.ObjectId,
  //   required: true
  // }
}, {
  timestamps: true
});

module.exports = mongoose.model("Artwork", artworkSchema);
