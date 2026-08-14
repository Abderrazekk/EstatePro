const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getSponsors,
  addSponsor,
  deleteSponsor,
} = require("../controllers/sponsorController");
// Optional: If you have admin authentication middleware, import it here
// const { protect, admin } = require("../middleware/authMiddleware");

// Configure Multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getSponsors);
// Wrap POST and DELETE with your auth middleware if required (e.g., router.post("/", protect, admin, upload.single("image"), addSponsor))
router.post("/", upload.single("image"), addSponsor);
router.delete("/:id", deleteSponsor);

module.exports = router;