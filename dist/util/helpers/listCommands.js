"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const COMMANDS_DIR = process.env.COMMANDS_DIR;
function listCommands() {
    const commands = fs_1.default
        .readdirSync(COMMANDS_DIR)
        .filter((file) => !file.startsWith(".") &&
        fs_1.default.lstatSync(path_1.default.join(COMMANDS_DIR, file)).isFile())
        .map((file) => file.split(".")[0]);
    console.log("Available commands:");
    console.log(commands);
}
exports.default = listCommands;
