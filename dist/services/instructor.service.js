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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInstructor = exports.updateInstructor = exports.getAllInstructors = exports.getInstructorById = exports.loginInstructor = exports.registerInstructor = void 0;
var bcrypt_1 = require("bcrypt");
var instructor_schema_1 = require("../schemas/instructor.schema");
var registerInstructor = function (instructorData) { return __awaiter(void 0, void 0, void 0, function () {
    var firstname, lastname, email, password, phoneNumber, googleId, profileImageUrl, existingInstructor, newInstructor, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                firstname = instructorData.firstname, lastname = instructorData.lastname, email = instructorData.email, password = instructorData.password, phoneNumber = instructorData.phoneNumber, googleId = instructorData.googleId, profileImageUrl = instructorData.profileImageUrl;
                if (!firstname || !lastname || !email || !password) {
                    return [2 /*return*/, { success: false, message: "All fields are required" }];
                }
                return [4 /*yield*/, instructor_schema_1.Instructor.findOne({ email: email })];
            case 1:
                existingInstructor = _a.sent();
                if (existingInstructor) {
                    return [2 /*return*/, { success: false, message: "Instructor already exists" }];
                }
                newInstructor = new instructor_schema_1.Instructor({
                    uid: crypto.randomUUID(),
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    googleId: googleId,
                    profileImageUrl: profileImageUrl,
                    role: "instructor", // Default role
                    courses: [] // Initialize with an empty array
                });
                return [4 /*yield*/, newInstructor.save()];
            case 2:
                result = _a.sent();
                return [2 /*return*/, { success: true, message: "Instructor created successfully", instructor: result }];
            case 3:
                error_1 = _a.sent();
                throw error_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerInstructor = registerInstructor;
var loginInstructor = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var instructor, isMatch, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, instructor_schema_1.Instructor.findOne({ email: email })];
            case 1:
                instructor = _a.sent();
                if (!instructor) {
                    return [2 /*return*/, { success: false, message: "Instructor not found" }];
                }
                if (!instructor.password) {
                    return [2 /*return*/, { success: false, message: "Invalid instructor data" }];
                }
                return [4 /*yield*/, (0, bcrypt_1.compare)(password, instructor.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    return [2 /*return*/, { success: false, message: "Invalid password" }];
                }
                return [2 /*return*/, { success: true, message: "Instructor logged in successfully", instructor: instructor }];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginInstructor = loginInstructor;
var getInstructorById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var instructor, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, instructor_schema_1.Instructor.findById(id)];
            case 1:
                instructor = _a.sent();
                if (!instructor) {
                    return [2 /*return*/, { success: false, message: "Instructor not found" }];
                }
                return [2 /*return*/, { success: true, message: "Instructor fetched successfully", instructor: instructor }];
            case 2:
                error_3 = _a.sent();
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getInstructorById = getInstructorById;
var getAllInstructors = function () { return __awaiter(void 0, void 0, void 0, function () {
    var instructors, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, instructor_schema_1.Instructor.find()];
            case 1:
                instructors = _a.sent();
                return [2 /*return*/, { success: true, message: "Instructors fetched successfully", instructors: instructors }];
            case 2:
                error_4 = _a.sent();
                throw error_4;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllInstructors = getAllInstructors;
var updateInstructor = function (id, instructorData) { return __awaiter(void 0, void 0, void 0, function () {
    var instructor, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, instructor_schema_1.Instructor.findByIdAndUpdate(id, instructorData, { new: true })];
            case 1:
                instructor = _a.sent();
                if (!instructor) {
                    return [2 /*return*/, { success: false, message: "Instructor not found" }];
                }
                return [2 /*return*/, { success: true, message: "Instructor updated successfully", instructor: instructor }];
            case 2:
                error_5 = _a.sent();
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateInstructor = updateInstructor;
var deleteInstructor = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var instructor, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, instructor_schema_1.Instructor.findByIdAndDelete(id)];
            case 1:
                instructor = _a.sent();
                if (!instructor) {
                    return [2 /*return*/, { success: false, message: "Instructor not found" }];
                }
                return [2 /*return*/, { success: true, message: "Instructor deleted successfully" }];
            case 2:
                error_6 = _a.sent();
                throw error_6;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteInstructor = deleteInstructor;
