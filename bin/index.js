#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import { program } from "commander";
import log from "../src/commands/log.js";
import inquirer from "inquirer";
import delay from "../src/commands/delay.js";
import ora from "ora";
import { Client } from "whatsapp-web.js"
import qrcode from "qrcode-terminal"

log(
  chalk.green(figlet.textSync("ZAPFAST", { horizontalLayout: "full" }))
);

program.action(async () => {

  const spinner = ora(`Generating QRCode...`).start(); // Start the spinner

  const client = new Client({
    webVersion: '2.2412.54',
    webVersionCache: { type: 'remote', remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html', },
    puppeteer: {
      headless: true,
      args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
      ]},
  })

  client.on("qr", async (qr) => {
    qrcode.generate(qr, { small: true });
    spinner.text = "Scan the QR code!"
  });

  client.on("ready", async () => {
    spinner.succeed(chalk.green("Client is ready!!"));

    const result = await inquirer.prompt([
      {
        type: 'input',
        name: "path",
        message: "Set the filePath of the csv file:"
      }
    ])
  
    console.log(`File path is: ${result.path}`)
  });

  client.initialize()

})

program.parse(process.argv);
