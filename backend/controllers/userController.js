const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// @desc    Toggle property in wishlist
exports.toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure wishlist is an array (for old users)
    if (!Array.isArray(user.wishlist)) {
      user.wishlist = [];
    }

    const propertyId = req.params.propertyId;

    // Check if the ID is valid (optional but helpful)
    if (!propertyId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const index = user.wishlist.findIndex((id) => id.toString() === propertyId);

    if (index === -1) {
      user.wishlist.push(propertyId);
    } else {
      user.wishlist.splice(index, 1);
    }

    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    // 🔍 THIS WILL SHOW THE REAL ERROR IN YOUR TERMINAL
    console.error("❌ toggleWishlist error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get user wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist");
    res.json(user.wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile (name and avatar)
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.name) user.name = req.body.name;

    if (req.file) {
      if (user.avatar && user.avatar !== "default-avatar.png") {
        const publicId = user.avatar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`avatars/${publicId}`);
      }
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "realestate/avatars" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          },
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      user.avatar = result.secure_url;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      wishlist: updatedUser.wishlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
