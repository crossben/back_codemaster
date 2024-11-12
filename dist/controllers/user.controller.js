"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollToCourse = exports.GetUserByGoogleId = exports.GetUserByPhoneNumber = exports.GetUserByMail = exports.GetAllUsers = exports.DeleteUser = exports.UpdateUser = exports.GetUserByUId = exports.GetUserById = exports.Register = exports.GoogleLogin = exports.Login = void 0;
var userService = __importStar(require("../services/user.service"));
var Login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, emailRegex, result, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, email = _a.email, password = _a.password;
                // Data validation
                if (!email || !password) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Email and password are required" })];
                }
                if (typeof email !== 'string' || typeof password !== 'string') {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Invalid input types" })];
                }
                emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Invalid email format" })];
                }
                // Minimum password length check
                if (password.length < 8) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Password must be at least 8 characters long" })];
                }
                return [4 /*yield*/, userService.loginByMail(email, password)];
            case 1:
                result = _b.sent();
                res.status(200).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error('Login error:', error_1);
                res.status(500).json({ success: false, message: "An error occurred during login" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Login = Login;
var GoogleLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var googleId, googleIdRegex, result, loginError_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                googleId = req.body.googleId;
                // Data validation
                if (!googleId) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Google ID is required" })];
                }
                if (typeof googleId !== 'string') {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Invalid input type for Google ID" })];
                }
                if (googleId.length < 21) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Invalid Google ID format" })];
                }
                googleIdRegex = /^[0-9]{21}$/;
                if (!googleIdRegex.test(googleId)) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Invalid Google ID format" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userService.loginByGoogle(googleId)];
            case 2:
                result = _a.sent();
                res.status(200).json(result);
                return [3 /*break*/, 4];
            case 3:
                loginError_1 = _a.sent();
                console.error('Google Login error:', loginError_1);
                res.status(500).json({ success: false, message: "An error occurred during Google login" });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_2 = _a.sent();
                console.error('Google Login error:', error_2);
                res.status(500).json({ success: false, message: "An error occurred processing the request" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.GoogleLogin = GoogleLogin;
var Register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstname, lastname, email, password, phoneNumber, googleId, profileImageUrl, emailRegex, phoneRegex, userData, result, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, firstname = _a.firstname, lastname = _a.lastname, email = _a.email, password = _a.password, phoneNumber = _a.phoneNumber, googleId = _a.googleId, profileImageUrl = _a.profileImageUrl;
                // Data validation
                if (!firstname || !lastname || !email || !password || !phoneNumber) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "All required fields must be provided" })];
                }
                if (typeof firstname !== 'string' || typeof lastname !== 'string' ||
                    typeof email !== 'string' || typeof password !== 'string' ||
                    typeof phoneNumber !== 'string') {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Invalid input types" })];
                }
                emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Invalid email format" })];
                }
                // Password length check
                if (password.length < 6) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Password must be at least 6 characters long" })];
                }
                phoneRegex = /^\+?[1-9]\d{1,14}$/;
                if (!phoneRegex.test(phoneNumber)) {
                    return [2 /*return*/, res.status(400).json({ success: false, message: "Invalid phone number format" })];
                }
                userData = { firstname: firstname, lastname: lastname, email: email, password: password, phoneNumber: phoneNumber, googleId: googleId, profileImageUrl: profileImageUrl };
                return [4 /*yield*/, userService.register(userData)];
            case 1:
                result = _b.sent();
                res.status(result.success ? 201 : 400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                console.error('Sign up error:', error_3);
                res.status(500).json({ success: false, message: "An error occurred during sign up" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.Register = Register;
var GetUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, userService.getUserById(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "User not found" })];
                }
                res.status(200).json({ user: user });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Error fetching user:', error_4);
                res.status(500).json({ success: false, message: "An error occurred fetching the user" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetUserById = GetUserById;
var GetUserByUId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                uid = req.params.uid;
                return [4 /*yield*/, userService.getUserByUId(uid)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "User not found" })];
                }
                res.status(200).json({ success: true, message: "User fetched successfully", user: user });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error fetching user:', error_5);
                res.status(500).json({ success: false, message: "An error occurred fetching the user" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetUserByUId = GetUserByUId;
var UpdateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userData, updatedUser, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                userData = req.body;
                return [4 /*yield*/, userService.updateUser(id, userData)];
            case 1:
                updatedUser = _a.sent();
                if (!updatedUser) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "User not found" })];
                }
                res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Error updating user:', error_6);
                res.status(500).json({ success: false, message: "An error occurred updating the user" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.UpdateUser = UpdateUser;
var DeleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, userService.deleteUser(id)];
            case 1:
                result = _a.sent();
                if (!result.success) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "User not found" })];
                }
                res.status(200).json({ success: true, message: "User deleted successfully" });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error('Error deleting user:', error_7);
                res.status(500).json({ success: false, message: "An error occurred deleting the user" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.DeleteUser = DeleteUser;
var GetAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userService.getAllUsers()];
            case 1:
                users = _a.sent();
                res.status(200).json({ success: true, message: "Users fetched successfully", users: users });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error('Error fetching users:', error_8);
                res.status(500).json({ success: false, message: "An error occurred fetching the users" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetAllUsers = GetAllUsers;
var GetUserByMail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.params.email;
                return [4 /*yield*/, userService.getUserByEmail(email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "User not found" })];
                }
                res.status(200).json({ success: true, message: "User fetched successfully", user: user });
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.error('Error fetching user by email:', error_9);
                res.status(500).json({ success: false, message: "An error occurred fetching the user by email" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetUserByMail = GetUserByMail;
var GetUserByPhoneNumber = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var phoneNumber, user, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                phoneNumber = req.params.phoneNumber;
                return [4 /*yield*/, userService.getUserByPhoneNumber(phoneNumber)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "User not found" })];
                }
                res.status(200).json({ success: true, message: "User fetched successfully", user: user });
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.error('Error fetching user by phone number:', error_10);
                res.status(500).json({ success: false, message: "An error occurred fetching the user by phone number" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetUserByPhoneNumber = GetUserByPhoneNumber;
var GetUserByGoogleId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var googleId, user, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                googleId = req.params.googleId;
                return [4 /*yield*/, userService.getUserByGoogleId(googleId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "User not found" })];
                }
                res.status(200).json({ success: true, message: "User fetched successfully", user: user });
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                console.error('Error fetching user by Google ID:', error_11);
                res.status(500).json({ success: false, message: "An error occurred fetching the user by Google ID" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.GetUserByGoogleId = GetUserByGoogleId;
var EnrollToCourse = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseId, uid, result, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                courseId = req.body.courseId;
                uid = req.params.uid;
                return [4 /*yield*/, userService.enrollToCourse(courseId, uid)];
            case 1:
                result = _a.sent();
                res.status(result.success ? 200 : 400).json(result);
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                console.error('Error enrolling student to course:', error_12);
                res.status(500).json({ success: false, message: "An error occurred enrolling the student to the course" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.EnrollToCourse = EnrollToCourse;
