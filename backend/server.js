const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedAdmin = require("./seedAdmin");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/userRoutes");
const adminClientRoutes = require("./routes/adminClientRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const sponsorRoutes = require("./routes/sponsorRoutes");
const bannerRoutes = require("./routes/bannerRoutes");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();

// Allowed Origins List
const allowedOrigins = [
  "http://localhost:5173",
  "https://estate-pro-henna.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, "");
    if (
      allowedOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Enable CORS Pre-Flight and Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/clients", adminClientRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/banners", bannerRoutes);

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
