#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("yargs/helpers");
const path_1 = __importDefault(require("path"));
require("./util/config").config();
run();
function run() {
    const { COMMANDS_DIR } = process.env;
    const args = (0, helpers_1.hideBin)(process.argv);
    const command = args.at(0);
    if (!command) {
        console.log("Welcome to the F1 CLI!");
        return;
    }
    const commandPath = path_1.default.join(COMMANDS_DIR, `${command}.js`);
    if (!fs_1.default.existsSync(commandPath)) {
        console.log("Command not found");
        return;
    }
    const commandModule = require(commandPath).default;
    commandModule(args.slice(1));
}
