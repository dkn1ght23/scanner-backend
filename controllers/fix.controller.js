import { ApiError } from "../errors/ApiError.js";
import { fixService } from "../services/fix.service.js";
import { ApiResponse } from "../utils/ApiResonse.js";

const express = require("express");
const router = express.Router();

export const fixContoller = asyncHandler(async (req, res) => {
  const { alert } = req.body;

  if (!alert)
    throw new ApiError(
      400,
      "Invalid request format. Expected { alert: 'error message' }"
    );

  const { message, statusCode, fix } = await fixService(alert);

  new ApiResponse(statusCode, message, fix).send(res);
});
