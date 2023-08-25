import path from "path";

export function config() {
  process.env.ROOT_DIR = path.join(__dirname, "..");
  process.env.COMMANDS_DIR = path.join(process.env.ROOT_DIR, "commands");
  process.env.TEMPLATES_DIR = path.join(process.env.ROOT_DIR, "templates");

  // console.log(process.env.ROOT_DIR);
  // console.log(process.env.COMMANDS_DIR);
  // console.log(process.env.TEMPLATES_DIR);
}
