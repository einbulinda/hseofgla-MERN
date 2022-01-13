import express from "express";
import {
  mpesaPassword,
  accessToken,
  stkPush,
  mpesaConfirmation,
  registerURLS,
} from "../controllers/mpesaControllers.js";

const router = express.Router();

// Obtain Access Token
router.get("/password", mpesaPassword);
router.get("/register", registerURLS);
router.post("/stk-push", accessToken, stkPush);
router.post("https://black-dodo-4.loca.lt/confirmation", mpesaConfirmation);

export default router;
