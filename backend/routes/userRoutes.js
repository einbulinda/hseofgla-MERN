import express from "express";
import {
  authUser,
  createAddress,
  getAddress,
  getAddressById,
  registerUser,
  updateUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.patch("/update", updateUser);
router.post("/address", createAddress);
router.get("/address/:id", getAddress);
router.get("/address-id/:id", getAddressById);

export default router;
