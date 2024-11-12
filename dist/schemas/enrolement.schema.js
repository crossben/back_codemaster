"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
var mongoose_1 = require("mongoose");
var enrollmentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    courseTitle: {
        type: String,
        default: ""
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    }
});
exports.Enrollment = (0, mongoose_1.model)('Enrollment', enrollmentSchema);
