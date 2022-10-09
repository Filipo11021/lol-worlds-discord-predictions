import fs from "fs";
import { config } from "./config.js";
const data = JSON.parse(fs.readFileSync(`./data/${config.folderName}/predictions.json`));

data.forEach((e) => console.log(e[0].users.length, e[1].users.length));
