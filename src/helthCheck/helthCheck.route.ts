import { Router } from "express";
import { healthCheck } from "./helthCheck.controller";

const router = Router();

router.get("/health", healthCheck);

export default router;
