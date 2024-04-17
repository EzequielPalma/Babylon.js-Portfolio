import { Router } from "express";
import { createContact, getContacts } from "../controllers/contact.controller.js";

const router = Router();

router.post("/registercontact", createContact);
router.get("/getcontacts", getContacts);

export default router;
