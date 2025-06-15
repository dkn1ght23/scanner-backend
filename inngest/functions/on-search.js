// functions/on-search.js
const { inngest } = require("../client");
const { NonRetriableError } = require("inngest");
const { uploadReport } = require("../../utils/uploadReport");

const onSearch = inngest.createFunction(
  {
    id: "report-generation",
    name: "PDF Report Generator", // Human-readable name for dashboard
    retries: 3, // Automatic retries for transient errors
    debounce: {
      period: "10s", // Prevent duplicate runs for same event
      key: "event.data.requestId", // Unique identifier if available
    },
  },
  { event: "app/report" }, // Must match your event name exactly
  async ({ event, step, logger }) => {
    try {
      logger.info("🟢 PDF generation started", { event });

      // Validate input data
      if (!event.data?.data) {
        throw new NonRetriableError("No report data provided");
      }

      // Process the report in steps
      const result = await step.run("generate-and-upload", async () => {
        const { data } = event.data;

        // 1. Validate data structure
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: expected array");
        }

        // 2. Process and upload PDF
        const pdfUrl = await uploadReport(data);

        logger.info("✅ PDF uploaded successfully", { pdfUrl });
        return { success: true, url: pdfUrl };
      });

      return result;
    } catch (error) {
      logger.error("🔴 PDF generation failed", { error });

      // Differentiate between retriable and permanent failures
      if (error instanceof NonRetriableError) {
        return { success: false, permanentFailure: true };
      }

      throw error; // Will trigger retries
    }
  }
);

// Ensure function has metadata for debugging
onSearch.config = {
  id: "report-generation",
  name: "PDF Report Generator",
  triggers: [{ event: "app/report" }],
};

module.exports = { onSearch };
