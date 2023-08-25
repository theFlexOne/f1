import fs from "fs";
import path from "path";

const TEMPLATES_DIR: string = process.env.TEMPLATES_DIR as string;

const projectTemplates = fs
  .readdirSync(TEMPLATES_DIR)
  .filter(
    (file) =>
      !file.startsWith(".") &&
      fs.lstatSync(path.join(TEMPLATES_DIR, file)).isDirectory()
  );

export default projectTemplates;
