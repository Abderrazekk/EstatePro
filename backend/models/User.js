const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    phone: {
      type: String,
      // Made optional for Google Auth (can prompt user to update later)
      default: "Not provided",
    },
    password: {
      type: String,
      // Removed required constraint to allow Google login without a password
      minlength: 6,
      select: false,
    },
    googleId: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
    },
    avatar: {
      type: String,
      default: "default-avatar.png",
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  // If the password hasn't been modified (like during Google Auth where they might not have a standard password), skip hashing
  if (!this.isModified("password")) {
    return;
  }

  // Hash the password
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw error;
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.password) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
