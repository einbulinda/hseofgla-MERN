import express from "express";
import {
  access,
  accessToken,
  confirmation,
  register,
  simulate,
  validation,
} from "../controllers/mpesaControllers.js";

const router = express.Router();
const baseURL = "https://b0ab-197-237-186-137.ngrok.io";

// Obtain Access Token
router.get("/access-token", access, accessToken);
router.get("/register", access, register);
router.post("/confirmation", confirmation);
router.post("/validation", validation);
router.get("/simulate", access, simulate);

// router.post("/stk-push", access, stkPush);

export default router;
