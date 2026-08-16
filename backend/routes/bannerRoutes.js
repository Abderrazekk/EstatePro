const express = require("express");
const router = express.Router();
const {
  getBanner,
  uploadBanner,
  deleteBanner,
} = require("../controllers/bannerController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router
  .route("/")
  .get(getBanner)
  .post(protect, admin, upload.single("image"), uploadBanner);

router.route("/:id").delete(protect, admin, deleteBanner);

module.exports = router;
