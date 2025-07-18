import express from "express";
import { mpesaCallback } from "../controllers/mpesaController.js";

const router = express.Router();
router.post("/callback", mpesaCallback);

export default router;
