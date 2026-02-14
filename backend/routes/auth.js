import express from "express";
import * as authCon from "../controllers/authController.js";
import { registered, customer } from "../validations/auth.validation.js"
import { validate } from "../validations/validate.middleware.js"
import { requireHeaders } from "../middleware/requireHeaders.js"
import { HEADER } from "../constants/constant.js"
import { authMiddleware } from "../middleware/authmiddleware.js"
const router = express.Router();
router.post("/login", validate(registered), authCon.login);

router.post("/registration", validate(registered), authCon.Userregister);
router.put("/create-customer", requireHeaders([HEADER]), authMiddleware, validate(customer), authCon.createCustomer);
router.get("/get-customer", requireHeaders([HEADER]), authMiddleware, authCon.getCustomer);


export default router;
