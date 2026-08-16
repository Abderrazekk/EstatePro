const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // ✅ Updated to accept both "images" (plural) and "image" (singular)
  if (file.fieldname === "images" || file.fieldname === "image") {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"), false);
    }
  } else if (file.fieldname === "video") {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error('Only videos are allowed for the "video" field'), false);
    }
  } else {
    // Helpful debug message if a wrong field name is used
    cb(new Error(`Unexpected field: ${file.fieldname}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});

module.exports = upload;
