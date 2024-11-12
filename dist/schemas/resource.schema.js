"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ressource = void 0;
var mongoose_1 = require("mongoose");
var ressourceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: false,
    },
});
exports.Ressource = (0, mongoose_1.model)('Ressources', ressourceSchema);
