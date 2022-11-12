"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Course = new mongoose_1.default.Schema({
    logo: {
        type: String,
        null: false,
    },
    title: {
        type: String,
        null: false,
    },
    duration: {
        type: String,
        null: false,
    },
    modules: {
        type: String,
        null: false,
    },
    details: {
        type: String,
        null: false,
    },
    price: {
        type: String,
        null: false,
    },
    color: {
        type: String,
        null: false,
    },
    link: {
        type: String,
        null: false,
    },
    lessons: {
        type: String,
        null: false,
    },
    task: {
        type: String,
        null: false,
    },
    tests: {
        type: String,
        null: false,
    },
    expert: {
        type: String,
        null: false,
    },
}, {
    timestamps: false,
});
exports.default = mongoose_1.default.model('Course', Course);
