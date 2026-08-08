const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dazjpqheh", // your actual cloud name
  api_key: "868784592691859", // your actual API key
  api_secret: "egp739rZSpcqUu196rtQDRZIvJ8", // your actual API secret
});

module.exports = cloudinary;
