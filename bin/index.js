import chalk from "chalk";
import figlet from "figlet";
import { program } from "commander";
import log from "../src/commands/log";

program.version("1.0.0").description("My Node CLI");

log(
    chalk.green(figlet.textSync("ZAPFAST", { horizontalLayout: "full" }))
  );

