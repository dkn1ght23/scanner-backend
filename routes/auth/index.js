import express from "express";
import {
  googleAuthMiddleware,
  googleCallbackAuth,
} from "../../middlewares/auth.middleware.js";
import { setJwtCookie } from "../../middlewares/jwtCookie.middleware.js";

const router = express.Router();

router.get("/google", googleAuthMiddleware);
router.get("/google/callback", googleCallbackAuth, setJwtCookie, (req, res) => {
  res.redirect("http://localhost:3000/dashboard");
});

export default router;
