const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artworkSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    artistName: {
      type: String,
      trim: true
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
      lowercase: true,
      trim: true
    },
    photoFileName: {
      type: String,
      required: true
    },
    isActivated: {
      type: Boolean,
      default: true,
      required: true
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  },
  {
    timestamps: true
  }
);

artworkSchema.index({ location: "2dsphere" });

function autoPopulateCountries(next) {
  // `this` is an instance of mongoose.Query
  this.populate("country", "name");
  next();
}

artworkSchema.pre("find", autoPopulateCountries);
artworkSchema.post("save", (doc, next) => {
  doc.populate("country", "name").execPopulate(() => {
    next();
  });
});

module.exports = mongoose.model("Artwork", artworkSchema);
