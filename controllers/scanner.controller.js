import { scannerService } from "../services/scanner.service.js";
import { ApiResponse } from "../utils/ApiResonse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../errors/ApiError.js";

export const scannerController = asyncHandler(async (req, res) => {
  const { targetUrl } = req.body;

  if (!targetUrl) throw new ApiError(400, "Required field missing");

  const { message, statusCode, vulnerabilities } = await scannerService(
    targetUrl
  );

  new ApiResponse(statusCode, message, vulnerabilities).send(res);
});
