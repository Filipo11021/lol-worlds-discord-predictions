import dotenv from "dotenv";

const pathToEnvFile = "/home/filip/Desktop/apps/node/worlds-lol/.env";
dotenv.config({ path: pathToEnvFile });

const config = {
  guildId: process.env.DISCORD_GUILD_ID,
  channelId: process.env.DISCORD_CHANNEL_ID,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  folderName: process.env.CONFIG_FOLDER_NAME,
  storage: process.env.CONFIG_STORAGE
};

config.predictionsMessage = `Worlds 2022 ${config.folderName}`;

export { config };
