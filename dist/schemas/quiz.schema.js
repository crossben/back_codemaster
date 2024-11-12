"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
var mongoose_1 = require("mongoose");
var quizSchema = new mongoose_1.Schema({
    title: {
        type: String,
        questions: {
            correctAnswer: {
                type: String,
                required: true,
            },
            question: {
                type: String,
                required: true
            },
            options: {
                type: mongoose_1.Schema.Types.Array,
                default: []
            }
        }
    }
});
exports.Quiz = (0, mongoose_1.model)('Quiz', quizSchema);
