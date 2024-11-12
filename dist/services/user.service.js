"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollToCourse = exports.getUserByGoogleId = exports.getUserByPhoneNumber = exports.getUserByEmail = exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.getUserByUId = exports.getUserById = exports.loginByGoogle = exports.register = exports.loginByMail = void 0;
var user_schema_1 = require("../schemas/user.schema");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var courses_schema_1 = require("../schemas/courses.schema");
var mongoose_1 = __importDefault(require("mongoose"));
// import authenticate from "../middlewares/auth.middleware";
// import firebaseAdmin from "../config/firebase.config";
// const router = Router();
// interface CustomRequest extends Request {
//     user?: any;
// }
// router.get("/", authenticate, async (req: CustomRequest, res: Response, next: express.NextFunction) => {
//     try {
//         res.status(200).json(req.user);
//     } catch (error) {
//         next(error);
//     }
// });
// router.post("/", async (req: CustomRequest, res: any) => {
//     const { email, name, password } = req.body;
//     if (!email || !name || !password) {
//         return res.status(400).json({
//             error:
//                 "Invalid request body. Must contain email, password, and name for user."
//         });
//     }
//     try {
//         const newFirebaseUser = await firebaseAdmin.auth.createUser({
//             email,
//             password
//         });
//         if (newFirebaseUser) {
//             const userCollection = req.app.locals.db.collection("user");
//             await userCollection.insertOne({
//                 email,
//                 name,
//                 firebaseId: newFirebaseUser.uid
//             });
//         }
//         return res
//             .status(200)
//             .json({ success: "Account created successfully. Please sign in." });
//     } catch (err: any) {
//         if (err.code === "auth/email-already-exists") {
//             return res
//                 .status(400)
//                 .json({ error: "User account already exists at email address." });
//         }
//         return res.status(500).json({ error: "Server error. Please try again" });
//     }
// });
// export default router;
var loginByMail = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user, isMatch, jwtSecret, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_schema_1.User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                if (!user.password) {
                    return [2 /*return*/, { success: false, message: "User account requires different authentication method" }];
                }
                return [4 /*yield*/, (0, bcrypt_1.compare)(password, user.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    return [2 /*return*/, { success: false, message: "Invalid password" }];
                }
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                token = jsonwebtoken_1.default.sign({ _id: user.id }, jwtSecret) || "no token";
                return [2 /*return*/, {
                        success: true,
                        message: "User logged in successfully",
                        token: token,
                        user: user
                    }];
            case 3:
                error_1 = _a.sent();
                console.error('Login error:', error_1);
                return [2 /*return*/, { success: false, message: "Error logging in" }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginByMail = loginByMail;
var register = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var firstname, lastname, email, password, phoneNumber, googleId, profileImageUrl, existingUser, newUser, jwtSecret, token, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                firstname = userData.firstname, lastname = userData.lastname, email = userData.email, password = userData.password, phoneNumber = userData.phoneNumber, googleId = userData.googleId, profileImageUrl = userData.profileImageUrl;
                if (!firstname || !lastname || !email || !password) {
                    return [2 /*return*/, { success: false, message: "All fields are required" }];
                }
                return [4 /*yield*/, user_schema_1.User.findOne({ email: email })];
            case 1:
                existingUser = _a.sent();
                if (existingUser) {
                    return [2 /*return*/, { success: false, message: "User already exists" }];
                }
                newUser = new user_schema_1.User({
                    uid: crypto.randomUUID(),
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    googleId: googleId,
                    profileImageUrl: profileImageUrl,
                    role: "student", // Default role
                    enrolledToCourses: [] // Initialize with an empty array
                });
                return [4 /*yield*/, newUser.save()];
            case 2:
                _a.sent();
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                token = jsonwebtoken_1.default.sign({ _id: newUser.id }, jwtSecret) || "no token";
                return [2 /*return*/, {
                        success: true,
                        message: "User created successfully",
                        token: token,
                        user: newUser // Corrected to use newUser instead of user
                    }];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var loginByGoogle = function (googleId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, jwtSecret, token, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.findOne({ googleId: googleId })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                token = jsonwebtoken_1.default.sign({ _id: user.id }, jwtSecret) || "no token";
                return [2 /*return*/, {
                        success: true,
                        message: "User logged in successfully",
                        token: token,
                        user: user ? user : null
                    }];
            case 2:
                error_3 = _a.sent();
                console.error('Login error:', error_3);
                return [2 /*return*/, { success: false, message: "Error logging in" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.loginByGoogle = loginByGoogle;
var getUserById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.findById(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                return [2 /*return*/, {
                        success: true,
                        message: "User fetched successfully",
                        user: user ? user : null
                    }];
            case 2:
                error_4 = _a.sent();
                console.error('Error fetching user:', error_4);
                return [2 /*return*/, { success: false, message: "Error fetching user" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
// export const getUserById = async (id: string) => {
//     try {
//         const user = await User.findById(id);
//         return user;
//     } catch (error) {
//         throw error;
//     }
// }
var getUserByUId = function (uid) { return __awaiter(void 0, void 0, void 0, function () {
    var user, jwtSecret, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.findOne({ uid: uid })];
            case 1:
                user = _a.sent();
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                // const token = jwt.sign({ _id: user.id }, jwtSecret) || "no token";
                return [2 /*return*/, {
                        success: true,
                        message: "User fetched successfully",
                        // token: token,
                        user: user ? user : null
                    }];
            case 2:
                error_5 = _a.sent();
                console.error('Error fetching user:', error_5);
                return [2 /*return*/, { success: false, message: "Error fetching user" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserByUId = getUserByUId;
var updateUser = function (id, userData) { return __awaiter(void 0, void 0, void 0, function () {
    var user, jwtSecret, token, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.findOneAndUpdate({ _id: id }, userData, { new: true })];
            case 1:
                user = _a.sent();
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                token = jsonwebtoken_1.default.sign({ _id: user.id }, jwtSecret) || "no token";
                return [2 /*return*/, {
                        success: true,
                        message: "User fetched successfully",
                        token: token,
                        user: user ? user : null
                    }];
            case 2:
                error_6 = _a.sent();
                console.error('Error updating user:', error_6);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.findOneAndDelete({ _id: id })];
            case 1:
                _a.sent();
                if (!user_schema_1.User) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                return [2 /*return*/, { success: true, message: "User deleted successfully" }];
            case 2:
                error_7 = _a.sent();
                console.error('Error deleting user:', error_7);
                return [2 /*return*/, { success: false, message: "Error deleting user" }];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var getAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, users];
            case 2:
                error_8 = _a.sent();
                console.error('Error fetching users:', error_8);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var user, jwtSecret, token, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.findOne({ email: email })];
            case 1:
                user = _a.sent();
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                token = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret) || "no token";
                return [2 /*return*/, {
                        success: true,
                        message: "User fetched successfully",
                        token: token,
                        user: user ? user : null
                    }];
            case 2:
                error_9 = _a.sent();
                console.error('Error fetching user by email:', error_9);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserByEmail = getUserByEmail;
var getUserByPhoneNumber = function (phoneNumber) { return __awaiter(void 0, void 0, void 0, function () {
    var user, jwtSecret, token, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.findOne({ phoneNumber: phoneNumber })];
            case 1:
                user = _a.sent();
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                token = jsonwebtoken_1.default.sign({ id: user._id }, jwtSecret) || "no token";
                return [2 /*return*/, {
                        success: true,
                        message: "User fetched successfully",
                        token: token,
                        user: user ? user : null
                    }];
            case 2:
                error_10 = _a.sent();
                console.error('Error fetching user by phone number:', error_10);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserByPhoneNumber = getUserByPhoneNumber;
var getUserByGoogleId = function (googleId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, jwtSecret, token, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_schema_1.User.findOne({ googleId: googleId })];
            case 1:
                user = _a.sent();
                jwtSecret = process.env.JWT_SECRET;
                if (!jwtSecret) {
                    throw new Error('JWT_SECRET is not defined');
                }
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                token = jsonwebtoken_1.default.sign({ id: user._id }, jwtSecret) || "no token";
                return [2 /*return*/, {
                        success: true,
                        message: "User fetched successfully",
                        token: token,
                        user: user ? user : null
                    }];
            case 2:
                error_11 = _a.sent();
                console.error('Error fetching user by Google ID:', error_11);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserByGoogleId = getUserByGoogleId;
var enrollToCourse = function (courseId, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, course, error_12;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                // Vérification de l'ID de l'utilisateur
                if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
                    return [2 /*return*/, { success: false, message: "Invalid course ID" }];
                }
                return [4 /*yield*/, user_schema_1.User.findOne({ uid: userId })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, { success: false, message: "User not found" }];
                }
                return [4 /*yield*/, courses_schema_1.Course.findById(courseId)];
            case 2:
                course = _b.sent();
                if (!course) {
                    return [2 /*return*/, { success: false, message: "Course not found" }];
                }
                // Vérification si l'utilisateur est déjà inscrit au cours
                if ((_a = user.enrolledToCourses) === null || _a === void 0 ? void 0 : _a.includes(courseId)) {
                    return [2 /*return*/, { success: false, message: "User already enrolled in this course" }];
                }
                // Inscription de l'utilisateur au cours
                user.enrolledToCourses = user.enrolledToCourses && user.enrolledToCourses.length > 0 ? user.enrolledToCourses : [courseId];
                user.enrolledToCourses.push(courseId);
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, { success: true, message: "User enrolled to course successfully" }];
            case 4:
                error_12 = _b.sent();
                console.error('Error enrolling user to course:', error_12);
                return [2 /*return*/, { success: false, message: "Error enrolling user to course" }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.enrollToCourse = enrollToCourse;
