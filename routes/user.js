import express from "express";
import {
  allUsers,
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "./../controller/user.js";
import { isAuthenticated } from "./../middleware/index.js";

const router = express.Router();

router.get("/all", allUsers);

router.post("/new", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/me", isAuthenticated, getMyProfile);
export default router;
