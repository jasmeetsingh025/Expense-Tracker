import { Router } from "express";
import { createReport } from "../controller/reports.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { ReportsValidator } from "../validators/auth/reports.validators.js";
import { validate } from "../validators/validate.js";

const router = Router();

router.route("/").get(verifyJWT, ReportsValidator(), validate, createReport);

export default router;
