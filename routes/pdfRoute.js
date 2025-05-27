const express = require("express");
const router = express.Router();
const streamifier = require("streamifier");
const { generateReportHTML } = require("../utils/htmlReport");
const { createPDFBufferFromHTML } = require("../utils/createPDFBufferFromHTML");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/upload-report", async (req, res) => {
  const { alerts } = req.body;

  if (!alerts || !Array.isArray(alerts)) {
    return res.status(400).json({ error: "Invalid alerts format" });
  }

  try {
    const html = generateReportHTML(alerts);
    const pdfBuffer = await createPDFBufferFromHTML(html);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "scan-reports",
          public_id: `report-${Date.now()}`,
          overwrite: false,
          format: "pdf", // Explicitly set format to PDF
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(res.status(500).json({ error: "Failed to upload PDF" }));
          } else {
            resolve(
              res.json({
                url: result.secure_url,
                pdf_url: result.secure_url.replace(/\.\w+$/, ".pdf"), // Ensure .pdf extension
              })
            );
          }
        }
      );

      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error("PDF generation or upload error:", error);
    res.status(500).json({
      error: "Something went wrong",
      details: error.message,
    });
  }
});

module.exports = router;
