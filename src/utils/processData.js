import { parse, format } from 'fast-csv';
import fs from 'fs';
import delay from "../commands/delay.js";
import log from '../commands/log.js';

const processData = async (absolutePath, client) => {
  const rows = [];  // Armazena as linhas processadas

  // Lê o arquivo CSV original
  const stream = fs.createReadStream(absolutePath);
  const parser = stream.pipe(parse({ headers: true, skipRows: 1 }));

  for await (const row of parser) {
    log(row);

    const isValidNumber = await client.getNumberId(row.phoneNumber);

    row.isWhatsApp = isValidNumber ? 'True' : 'False';

    rows.push(row);

    await delay(1000);
  }

  const writeStream = fs.createWriteStream(absolutePath);
  const csvStream = format({ headers: true });

  csvStream.pipe(writeStream);

  for (const row of rows) {
    csvStream.write(row);
  }

  csvStream.end();
  console.log("Processing done, CSV with isWhatsApp column added and overwritten!");
}

export default processData;
