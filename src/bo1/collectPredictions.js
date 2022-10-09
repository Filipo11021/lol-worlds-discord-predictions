import { getMessages, savePredictions } from "../lib/data.js";
import { createClient } from "../lib/discordBot.js";
import { collectUsers } from "./lib/collectUsers.js";

const client = createClient();

client.on("ready", async () => {
  const messages = await getMessages.local();
  const data = await collectUsers(messages, client);

  await savePredictions.local(data);

  process.exit();
});
