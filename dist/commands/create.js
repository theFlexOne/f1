"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const IGNORED_FILES_AND_FOLDERS = [".git", "node_modules"];
const templatesDir = path_1.default.join(__dirname, "..", "..", "templates");
const projectTemplates = fs_1.default
    .readdirSync(templatesDir)
    .filter((file) => !file.startsWith(".") &&
    fs_1.default.lstatSync(path_1.default.join(templatesDir, file)).isDirectory());
function createCommand(args) {
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
    if (!projectTemplates.includes(template)) {
        console.log("Please specify a template");
        return;
    }
    const templatePath = path_1.default.join(templatesDir, template);
    if (!fs_1.default.existsSync(templatePath)) {
        console.log("Please specify a valid template");
        return;
    }
    copyDirectory(templatePath, directory);
    // run `npm install` in the directory
    (0, child_process_1.exec)("npm install", { cwd: directory }, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(stdout);
    });
}
exports.default = createCommand;
function copyDirectory(currentPath, destinationPath) {
    // check if destination exists
    if (!fs_1.default.existsSync(destinationPath)) {
        fs_1.default.mkdirSync(destinationPath);
    }
    const files = fs_1.default.readdirSync(currentPath);
    files.forEach((file) => {
        const newCurrentPath = path_1.default.join(currentPath, file);
        const newDestinationPath = path_1.default.join(destinationPath, file);
        if (fs_1.default.lstatSync(newCurrentPath).isDirectory()) {
            if (file in IGNORED_FILES_AND_FOLDERS)
                return;
            copyDirectory(newCurrentPath, newDestinationPath);
        }
        else {
            fs_1.default.copyFileSync(newCurrentPath, newDestinationPath);
        }
    });
}
