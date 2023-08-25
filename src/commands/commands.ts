import path from "path";
import yargs from "yargs/yargs";
import listCommands from "../util/helpers/listCommands";

export default function commands(args: string[]) {
  const command = args.at(0);

  if (!command) {
    console.log(listCommands());
  }
}
