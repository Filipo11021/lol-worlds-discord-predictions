import fs from "fs";
import { MESSAGES_PATH, BASE_FOLDER, PREDICTIONS_PATH } from "./constants.js";

export const saveMessages = {
  async local(messages) {
    fs.mkdirSync(BASE_FOLDER, { recursive: true });
    fs.writeFileSync(MESSAGES_PATH, JSON.stringify(messages));
  },
};

export const getMessages = {
  async local() {
    const data = fs.readFileSync(MESSAGES_PATH);
    return JSON.parse(data);
  },
};

export const savePredictions = {
  async local(data) {
    fs.mkdirSync(BASE_FOLDER, { recursive: true });
    fs.writeFileSync(PREDICTIONS_PATH, JSON.stringify(data));
  },
};
