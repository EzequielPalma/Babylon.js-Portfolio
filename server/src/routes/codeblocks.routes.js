import { Router } from "express";
import { createCodeBlocks, getCodeBlocks } from "../controllers/codeblocks.controller.js";

const router = Router();

router.post("/registercodeblocks", createCodeBlocks);
router.get("/getcodeblocks", getCodeBlocks);


export default router;
