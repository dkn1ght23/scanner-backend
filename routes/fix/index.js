import express from "express";
import { fixContoller } from "../../controllers/fix.controller.js";

const router = express.Router();

router.post("/", fixContoller);

export default router;
