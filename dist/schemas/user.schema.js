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
exports.User = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var mongoose_1 = require("mongoose");
/**
 * Mongoose schema for the User model.
 * Defines the structure and constraints for user documents in the database.
 */
var userSchema = new mongoose_1.Schema({
    uid: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: false,
        default: "",
    },
    googleId: {
        type: String,
        required: false,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "https://i.imgur.com/m7pNWV9.png",
        required: false,
    },
    role: {
        type: String,
        default: "student",
        required: true,
        immutable: true,
    },
    enrolledToCourses: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: 'Course',
        required: false,
    },
}, {
    timestamps: true,
});
// Pre-save middleware to hash the password
// Pre-save middleware to hash the password before saving
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Check if the password field has been modified
                    if (!this.isModified('password')) {
                        return [2 /*return*/, next()];
                    }
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 1:
                    salt = _b.sent();
                    // Hash the password using the generated salt
                    _a = this;
                    return [4 /*yield*/, bcrypt_1.default.hash(this.password, salt)];
                case 2:
                    // Hash the password using the generated salt
                    _a.password = _b.sent();
                    // Continue with the save operation
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, bcrypt_1.default.compare(candidatePassword, this.password)];
        });
    });
};
/**
 * Mongoose model for User documents.
 * Used for CRUD operations on the 'User' collection in MongoDB.
 */
exports.User = (0, mongoose_1.model)('User', userSchema);
/**
 * TODO for future developers:
 * 1. Implement email validation in the schema.
 * 2. Add a pre-save hook to hash passwords before storing.
 * 3. Consider adding timestamps for createdAt and updatedAt.
 * 4. Implement unique constraint on email and uid fields.
 * 5. Add methods for password comparison and user authentication.
 * 6. Consider implementing virtual fields (e.g., fullName).
 * 7. Add indexes to frequently queried fields for performance.
 */
// Sample JSON for testing the User API
var sampleUserJSON = {
    "uid": "12345",
    "firstname": "John",
    "lastname": "Doe",
    "email": "johndoe@example.com",
    "phoneNumber": "+1234567890",
    "googleId": "google123456",
    "password": "securePassword123",
    "profileImageUrl": "https://example.com/profile.jpg",
    "enrolledToCourses": ["60d5ecb74f52a531a4d1a346", "60d5ecb74f52a531a4d1a347"]
};
// console.log(JSON.stringify(sampleUserJSON, null, 2));
