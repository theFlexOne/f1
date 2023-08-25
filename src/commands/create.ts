import yargs from "yargs/yargs";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import copyDirectory from "../util/helpers/copyDirectory";

interface CreateArgs {
  directory: string;
  template: string;
}

const IGNORED_FILES_AND_FOLDERS = [".git", "node_modules"];

const TEMPLATES_DIR: string = process.env.TEMPLATES_DIR as string;

export default function create(args: string[]) {
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

  const templatePath = path.join(TEMPLATES_DIR, template);

  if (!fs.existsSync(templatePath)) {
    console.log("Please specify a valid template");
    return;
  }

  copyDirectory(templatePath, directory, IGNORED_FILES_AND_FOLDERS);

  // run `npm install` in the directory
  exec("npm install", { cwd: directory }, (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(stdout);
  });
}

