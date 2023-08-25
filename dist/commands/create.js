"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const copyDirectory_1 = __importDefault(require("../util/helpers/copyDirectory"));
const IGNORED_FILES_AND_FOLDERS = [".git", "node_modules"];
const TEMPLATES_DIR = process.env.TEMPLATES_DIR;
function create(args) {
    const argv = (0, yargs_1.default)(args)
        .options({
        directory: {
            type: "string",
            alias: "d",
            description: "The directory to create the project in",
            default: ".",
        },
        template: {
            type: "string",
            alias: "t",
            description: "The template to use",
            default: "default",
        },
    })
        .help().argv;
    console.log(argv);
    let { directory, template } = argv;
    directory ||= "./";
    const templatePath = path_1.default.join(TEMPLATES_DIR, template);
    if (!fs_1.default.existsSync(templatePath)) {
        console.log("Please specify a valid template");
        return;
    }
    (0, copyDirectory_1.default)(templatePath, directory, IGNORED_FILES_AND_FOLDERS);
    // run `npm install` in the directory
    (0, child_process_1.exec)("npm install", { cwd: directory }, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stdout);
    });
}
exports.default = create;
