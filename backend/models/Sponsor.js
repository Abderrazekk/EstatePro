const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    imageUrl: { 
      type: String, 
      required: true 
    },
    cloudinaryId: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sponsor", sponsorSchema);