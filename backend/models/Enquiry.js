const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Please add a message"],
    },
    meetingDate: {
      type: Date,
      default: null,
    },
    meetingTime: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["unread", "read", "confirmed", "refused"], // ✅ added 'refused'
      default: "unread",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Enquiry", enquirySchema);
