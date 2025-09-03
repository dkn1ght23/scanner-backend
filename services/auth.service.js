import passport from "passport";
import { ApiError } from "../errors/ApiError.js";
import { fixService } from "../services/fix.service.js";
import { ApiResponse } from "../utils/ApiResonse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const googleAuthMiddleware = passport.authenticate("google", {
  scope: ["profile", "email"],
  session: false,
});
