import { saveMessages } from "../lib/data.js";
import { createClient } from "../lib/discordBot.js";
import { createPrediction } from "./lib/createPrediction.js";

const client = createClient();

client.on("ready", async () => {
  const messages = await createPrediction(client);

  await saveMessages.local(messages);

  process.exit();
});
