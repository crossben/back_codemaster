import { Router } from "express";
import { GetAllUsers, GoogleLogin, Login, Register, GetUserById, GetUserByMail, GetUserByPhoneNumber, GetUserByGoogleId, DeleteUser, UpdateUser, EnrollToCourse } from "../controllers/user.controller";
import { guard } from "../middlewares/guard.middleware";

const router = Router();

// User registration
// localhost:2002/api/user/register-api
router.post("/register-api", Register);

// User login with email and password
// localhost:2002/api/user/login-api
router.post("/login-api", Login);

// User login with Google
// localhost:2002/api/user/google-login-api
router.post("/google-login-api", guard, GoogleLogin);

// Get all users (admin function)
// localhost:2002/api/user/
router.get("/",  GetAllUsers);

// Get user by UID
// localhost:2002/api/user/id/:id
router.get("/id/:id",  GetUserById);

// Get user by email
// localhost:2002/api/user/email/:email
router.get("/email/:email", guard, GetUserByMail);

// Get user by phone number
// localhost:2002/api/user/phone-number/:phoneNumber
router.get("/phone-number/:phoneNumber", guard, GetUserByPhoneNumber);

// Get user by Google ID
// localhost:2002/api/user/google-id/:googleId
router.get("/google-id/:googleId", guard, GetUserByGoogleId);

// Delete user by UID
// localhost:2002/api/user/delete/:id
router.delete("/delete/:id", guard, DeleteUser);

// Update user information by UID
// localhost:2002/api/user/update/:id
router.put("/update/:id", guard, UpdateUser);

router.post("/enroll/:uid", guard, EnrollToCourse);

export default router;