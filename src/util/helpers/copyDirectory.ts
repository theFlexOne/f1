import fs from "fs";
import path from "path";

export default function copyDirectory(
  currentPath: string,
  destinationPath: string,
  ignoredFilesAndFolders: string[] = []
) {
  if (!fs.existsSync(destinationPath)) {
    fs.mkdirSync(destinationPath);
  }

  const fileNames = fs.readdirSync(currentPath);

  fileNames.forEach((fileName) => {
    const newCurrentPath = path.join(currentPath, fileName);
    const newDestinationPath = path.join(destinationPath, fileName);

    if (fs.lstatSync(newCurrentPath).isDirectory()) {
      if (fileName in ignoredFilesAndFolders) return;
      copyDirectory(newCurrentPath, newDestinationPath);
    } else {
      fs.copyFileSync(newCurrentPath, newDestinationPath);
    }
  });
}
