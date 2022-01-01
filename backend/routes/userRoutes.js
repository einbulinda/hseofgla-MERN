import express from "express";
import {
  authUser,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.patch("/update", updateUser);

export default router;
