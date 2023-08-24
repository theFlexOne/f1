#!/usr/bin/env node

import fs from "fs";
import path from "path";

const COMMANDS_DIR = path.join(__dirname, "commands");

const [command, ...options]: string[] = process.argv.slice(2);
const commandPath = path.join(COMMANDS_DIR, `${command}.js`);

console.log(command, options);

if (fs.existsSync(commandPath)) {
  require(commandPath).default(options);
}
