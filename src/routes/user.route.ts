import { Router } from "express";
import { GetAllUsers, GoogleLogin, Login, Sign, GetUserById, GetUserByMail, GetUserByPhoneNumber, GetUserByGoogleId, DeleteUser, UpdateUser } from "../controllers/user.controller";

const router = Router();

// User registration
router.post("/signup-api", Sign);

// User login with email and password
router.post("/login-api", Login);

// User login with Google
router.post("/google-login-api", GoogleLogin);

// Get all users (admin function)
router.get("/", GetAllUsers);

// Get user by UID
router.get("/id/:id", GetUserById);

// Get user by email
router.get("/email/:email", GetUserByMail);

// Get user by phone number
router.get("/phone-number/:phoneNumber", GetUserByPhoneNumber);

// Get user by Google ID
router.get("/google-id/:googleId", GetUserByGoogleId);

// Delete user by UID
router.delete("/:id", DeleteUser);

// Update user information by UID
router.put("/:id", UpdateUser);



export default router;
