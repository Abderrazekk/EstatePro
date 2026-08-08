const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedAdmin = require("./seedAdmin");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require('./routes/userRoutes');
const adminClientRoutes = require('./routes/adminClientRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

// Load other env vars (PORT, MONGO_URI, JWT_SECRET) from .env
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin/clients', adminClientRoutes);
app.use('/api/enquiries', enquiryRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();
    console.log("Admin seeding check completed.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
