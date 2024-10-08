import { Router } from "express";
import { GetAllUsers, GoogleLogin, Login, Sign, GetUserById, GetUserByMail, GetUserByPhoneNumber, GetUserByGoogleId, DeleteUser, UpdateUser } from "../controllers/user.controller";

const router = Router();

// User registration
// localhost:2002/api/user/signup-api
router.post("/signup-api", Sign);

// User login with email and password
// localhost:2002/api/user/login-api
router.post("/login-api", Login);

// User login with Google
// localhost:2002/api/user/google-login-api
router.post("/google-login-api", GoogleLogin);

// Get all users (admin function)
// localhost:2002/api/user/
router.get("/", GetAllUsers);

// Get user by UID
// localhost:2002/api/user/id/:id
router.get("/id/:id", GetUserById);

// Get user by email
// localhost:2002/api/user/email/:email
router.get("/email/:email", GetUserByMail);

// Get user by phone number
// localhost:2002/api/user/phone-number/:phoneNumber
router.get("/phone-number/:phoneNumber", GetUserByPhoneNumber);

// Get user by Google ID
// localhost:2002/api/user/google-id/:googleId
router.get("/google-id/:googleId", GetUserByGoogleId);

// Delete user by UID
// localhost:2002/api/user/delete/:id
router.delete("/delete/:id", DeleteUser);

// Update user information by UID
// localhost:2002/api/user/update/:id
router.put("/update/:id", UpdateUser);

export default router;