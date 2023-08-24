#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const COMMANDS_DIR = path_1.default.join(__dirname, "commands");
const [command, ...options] = process.argv.slice(2);
const commandPath = path_1.default.join(COMMANDS_DIR, `${command}.js`);
console.log(command, options);
if (fs_1.default.existsSync(commandPath)) {
    require(commandPath).default(options);
}
