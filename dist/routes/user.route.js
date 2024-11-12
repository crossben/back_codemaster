"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var guard_middleware_1 = require("../middlewares/guard.middleware");
var router = (0, express_1.Router)();
// User registration
// localhost:2002/api/user/register-api
router.post("/register-api", user_controller_1.Register);
// User login with email and password
// localhost:2002/api/user/login-api
router.post("/login-api", user_controller_1.Login);
// User login with Google
// localhost:2002/api/user/google-login-api
router.post("/google-login-api", guard_middleware_1.guard, user_controller_1.GoogleLogin);
// Get all users (admin function)
// localhost:2002/api/user/
router.get("/", user_controller_1.GetAllUsers);
// Get user by UID
// localhost:2002/api/user/id/:id
router.get("/id/:id", user_controller_1.GetUserById);
// Get user by email
// localhost:2002/api/user/email/:email
router.get("/email/:email", guard_middleware_1.guard, user_controller_1.GetUserByMail);
// Get user by phone number
// localhost:2002/api/user/phone-number/:phoneNumber
router.get("/phone-number/:phoneNumber", guard_middleware_1.guard, user_controller_1.GetUserByPhoneNumber);
// Get user by Google ID
// localhost:2002/api/user/google-id/:googleId
router.get("/google-id/:googleId", guard_middleware_1.guard, user_controller_1.GetUserByGoogleId);
// Delete user by UID
// localhost:2002/api/user/delete/:id
router.delete("/delete/:id", guard_middleware_1.guard, user_controller_1.DeleteUser);
// Update user information by UID
// localhost:2002/api/user/update/:id
router.put("/update/:id", guard_middleware_1.guard, user_controller_1.UpdateUser);
router.post("/enroll/:uid", guard_middleware_1.guard, user_controller_1.EnrollToCourse);
exports.default = router;
