import { Router } from "express";
import { createWork, getWorks } from "../controllers/works.controller.js";

const router = Router();

router.post("/registerwork", createWork);
router.get("/getworks", getWorks);


export default router;
