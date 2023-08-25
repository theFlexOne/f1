"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const TEMPLATES_DIR = process.env.TEMPLATES_DIR;
const projectTemplates = fs_1.default
    .readdirSync(TEMPLATES_DIR)
    .filter((file) => !file.startsWith(".") &&
    fs_1.default.lstatSync(path_1.default.join(TEMPLATES_DIR, file)).isDirectory());
exports.default = projectTemplates;
