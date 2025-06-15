const streamifier = require("streamifier");
const { generateReportHTML } = require("../utils/htmlReport");
const { createPDFBufferFromHTML } = require("../utils/createPDFBufferFromHTML");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadReport(alerts) {
  if (!alerts || !Array.isArray(alerts)) {
    throw new Error("Invalid alerts format");
  }

  try {
    const html = generateReportHTML(alerts);

    const pdfBuffer = await createPDFBufferFromHTML(html).catch((error) => {
      console.error("PDF generation error:", error);
      throw new Error("Failed to generate PDF: " + error.message);
    });

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "scan-reports",
          public_id: `report-${Date.now()}`,
          overwrite: false,
          format: "pdf",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return reject(error);
          }
          resolve(result);
        }
      );

      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });

    return {
      url: result.secure_url,
      pdf_url: result.secure_url.replace(/\.\w+$/, ".pdf"),
    };
  } catch (error) {
    console.error("uploadReport error:", error);
    throw error;
  }
}

module.exports = { uploadReport };
