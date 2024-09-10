#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import { program } from "commander";
import log from "../src/commands/log.js";
import inquirer from "inquirer";
import ora from "ora";
import qrcode from "qrcode-terminal"
import client from "../src/lib/wwjsConfig.js";
import processData from "../src/utils/processData.js";
import path from "path"

log(
  chalk.green(figlet.textSync("ZAPFAST", { horizontalLayout: "full" }))
);

program.action(async () => {

  const { path: filePath } = await inquirer.prompt([
    {
      type: 'input',
      name: "path",
      message: "Set the .csv filePath:"
    }
  ])

  const spinner = ora(`Generating QRCode...`).start(); // Start the spinner

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
    spinner.text = "Scan the QR code!"
  });

  client.on("ready", async () => {
    spinner.succeed(chalk.green("Client is ready!!"));

    const absolutePath = path.resolve(process.cwd(), filePath);

    await processData(absolutePath, client)
  
  });

  client.initialize()

})

program.parse(process.argv);
