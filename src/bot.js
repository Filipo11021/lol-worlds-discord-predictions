import { config } from "../config.js";
import {
  createClient,
  getGuild,
  getPredictionsChannel,
} from "./lib/discordBot.js";

const client = createClient();
const { channelId } = config;
let guild;

client.on("ready", async () => {
  console.log("ready");
  guild = await getGuild(client);
  const channel = await getPredictionsChannel(client);
  await channel.messages.fetch({ limit: 15 });
});

client.on("messageReactionAdd", async (reaction, { id }) => {
  try {
    // const reactionName = (await reaction.fetch())._emoji.name;
    // if (reactionName !== "🔵" && reactionName !== "🔴") return

    if (reaction.message.channelId !== channelId) return;
   

    const role = guild?.roles.cache.find((role) => role.name === "WORLDS");

    const user = guild?.members.cache.get(id);
    user?.roles.add(role);
  } catch (error) {
    console.log(error);
  }
});


