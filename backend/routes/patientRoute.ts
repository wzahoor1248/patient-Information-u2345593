import express from "express";
import { createPatient } from "../controllers/patientController.js";
// We will create a router object
const router = express.Router();
router.post("/create", createPatient);
// We will export the router
export default router;
