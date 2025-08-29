import express from "express";
import { scannerController } from "../../controllers/scanner.controller.js";

const router = express.Router();

router.post("/", scannerController);

export default router;
