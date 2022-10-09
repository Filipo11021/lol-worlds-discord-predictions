import { getMessages, savePredictions } from "../lib/data.js";
import { createClient } from "../lib/discordBot.js";
import { collectData } from "./lib/collectData.js";

const client = createClient();

client.on("ready", async () => {
  const messages = await getMessages.local();
  const data = await collectData(client, messages);

  await savePredictions.local(data);

  process.exit();
});
