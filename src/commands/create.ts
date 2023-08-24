import yargs from "yargs/yargs";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { Argv } from "yargs";

interface CreateArgs {
  directory: string;
  template: string;
}

const IGNORED_FILES_AND_FOLDERS = [".git", "node_modules"];

const templatesDir = path.join(__dirname, "..", "..", "templates");

const projectTemplates = fs
  .readdirSync(templatesDir)
  .filter(
    (file) =>
      !file.startsWith(".") &&
      fs.lstatSync(path.join(templatesDir, file)).isDirectory()
  );

export default function createCommand(args: string[]) {
  const argv = yargs(args)
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

  let { directory, template } = argv as CreateArgs;

  directory ||= "./";

  if (!projectTemplates.includes(template)) {
    console.log("Please specify a template");
    return;
  }

  const templatePath = path.join(templatesDir, template);

  if (!fs.existsSync(templatePath)) {
    console.log("Please specify a valid template");
    return;
  }

  copyDirectory(templatePath, directory);
  // run `npm install` in the directory
  exec("npm install", { cwd: directory }, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
  });
}

function copyDirectory(currentPath: string, destinationPath: string) {
  // check if destination exists
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath);
  }

  const files = fs.readdirSync(currentPath);

  files.forEach((file) => {
    const newCurrentPath = path.join(currentPath, file);
    const newDestinationPath = path.join(destinationPath, file);

    if (fs.lstatSync(newCurrentPath).isDirectory()) {
      if (file in IGNORED_FILES_AND_FOLDERS) return;
      copyDirectory(newCurrentPath, newDestinationPath);
    } else {
      fs.copyFileSync(newCurrentPath, newDestinationPath);
    }
  });
}
