"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Support = new mongoose_1.default.Schema({
    name: {
        type: String,
        null: false,
        require: true,
    },
    email: {
        type: String,
        require: true,
        null: false,
    },
    message: {
        type: String,
        null: true,
    },
}, {
    timestamps: false,
});
exports.default = mongoose_1.default.model('Support', Support);
