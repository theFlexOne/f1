"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
function config() {
    process.env.ROOT_DIR = path_1.default.join(__dirname, "..");
    process.env.COMMANDS_DIR = path_1.default.join(process.env.ROOT_DIR, "commands");
    process.env.TEMPLATES_DIR = path_1.default.join(process.env.ROOT_DIR, "templates");
    // console.log(process.env.ROOT_DIR);
    // console.log(process.env.COMMANDS_DIR);
    // console.log(process.env.TEMPLATES_DIR);
}
exports.config = config;
