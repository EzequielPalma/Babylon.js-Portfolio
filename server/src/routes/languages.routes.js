import { Router } from "express";
import { createLanguage, getLanguages } from "../controllers/languages.controller.js";

const router = Router();

router.post("/registerlanguage", createLanguage);
router.get("/getlanguages", getLanguages);


export default router;
