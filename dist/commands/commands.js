"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listCommands_1 = __importDefault(require("../util/helpers/listCommands"));
function commands(args) {
    const command = args.at(0);
    if (!command) {
        console.log((0, listCommands_1.default)());
    }
}
exports.default = commands;
