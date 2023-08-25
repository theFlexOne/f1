"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function copyDirectory(currentPath, destinationPath, ignoredFilesAndFolders = []) {
    if (!fs_1.default.existsSync(destinationPath)) {
        fs_1.default.mkdirSync(destinationPath);
    }
    const fileNames = fs_1.default.readdirSync(currentPath);
    fileNames.forEach((fileName) => {
        const newCurrentPath = path_1.default.join(currentPath, fileName);
        const newDestinationPath = path_1.default.join(destinationPath, fileName);
        if (fs_1.default.lstatSync(newCurrentPath).isDirectory()) {
            if (fileName in ignoredFilesAndFolders)
                return;
            copyDirectory(newCurrentPath, newDestinationPath);
        }
        else {
            fs_1.default.copyFileSync(newCurrentPath, newDestinationPath);
        }
    });
}
exports.default = copyDirectory;
