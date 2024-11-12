"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
var mongoose_1 = require("mongoose");
// Define the schema with validation
var moduleSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    contenu: { type: String, trim: true },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});
// Add pre-save hook for additional validation or transformation
moduleSchema.pre('save', function (next) {
    if (!this.name) {
        return next(new Error('Name and description are required.'));
    }
    next();
});
// Create the model
exports.Module = (0, mongoose_1.model)('Modules', moduleSchema);
