import fs from "fs";
import path from "path";

const COMMANDS_DIR: string = process.env.COMMANDS_DIR as string;

export default function listCommands() {
  const commands = fs
    .readdirSync(COMMANDS_DIR)
    .filter(
      (file) =>
        !file.startsWith(".") &&
        fs.lstatSync(path.join(COMMANDS_DIR, file)).isFile()
    )
    .map((file) => file.split(".")[0]);

  console.log("Available commands:");
  console.log(commands);
}
