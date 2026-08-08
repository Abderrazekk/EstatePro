// backend/seedAdmin.js
const mongoose = require("mongoose");
const User = require("./models/User");

const seedAdmin = async () => {
  // If called directly (node seedAdmin.js), we need to connect to DB first.
  // If called from server.js, mongoose is already connected.
  const isAlreadyConnected = mongoose.connection.readyState === 1;

  if (!isAlreadyConnected) {
    // We are running standalone, so connect using MONGO_URI
    require("dotenv").config();
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");
  }

  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (!adminExists) {
      await User.create({
        name: "Admin User",
        email: "admin@realestate.com",
        password: "Admin123!",
        role: "admin",
      });
      console.log("✅ Admin account created");
      console.log("   Email: admin@realestate.com");
      console.log("   Password: Admin123!");
    } else {
      console.log("ℹ️  Admin already exists, skipping.");
    }
  } catch (error) {
    console.error("❌ Seeding error:", error);
    throw error; // propagate to server.js so it can exit
  } finally {
    // Only disconnect if we connected on our own (standalone mode)
    if (!isAlreadyConnected) {
      await mongoose.disconnect();
    }
  }
};

// Allow running directly: node seedAdmin.js
if (require.main === module) {
  seedAdmin().then(() => process.exit());
}

module.exports = seedAdmin;
