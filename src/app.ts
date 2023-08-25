#!/usr/bin/env node

import fs from "fs";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import path from "path";

require("./util/config").config();

run();

function run() {
  const { COMMANDS_DIR }: NodeJS.ProcessEnv = process.env;

  const args: string[] = hideBin(process.argv);

  const command = args.at(0);

  if (!command) {
    console.log("Welcome to the F1 CLI!");
    return;
  }

  const commandPath = path.join(COMMANDS_DIR as string, `${command}.js`);

  if (!fs.existsSync(commandPath)) {
    console.log("Command not found");
    return;
  }

  const commandModule = require(commandPath).default;

  commandModule(args.slice(1));
}
