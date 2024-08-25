import chalk from "chalk";


const log = console.log;

log(
    chalk.green(figlet.textSync("My Node CLI", { horizontalLayout: "full" }))
  );