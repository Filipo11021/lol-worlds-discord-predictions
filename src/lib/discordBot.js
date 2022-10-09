import { Client, GatewayIntentBits } from "discord.js";
import { config } from "../../config.js";

const { DISCORD_TOKEN, channelId, guildId } = config;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
  ],
});

export const createClient = () => {
  const token = DISCORD_TOKEN
  client.login(token);

  return client;
};

export const getPredictionsChannel = async (client) => {
  const guild = await client.guilds.fetch(guildId);
  const channel = guild.channels.cache.get(channelId);

  return channel;
};

export const getGuild = async (client) => {
  const guild = await client.guilds.fetch(guildId);
  return guild
}
