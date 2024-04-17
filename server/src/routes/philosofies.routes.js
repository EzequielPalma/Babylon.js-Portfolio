import { Router } from "express";
import { createPhilosophies, getPhilosophies } from "../controllers/philosophies.model.js";

const router = Router();

router.post("/registerphilosofies", createPhilosophies);
router.get("/getphilosofies", getPhilosophies);


export default router;
