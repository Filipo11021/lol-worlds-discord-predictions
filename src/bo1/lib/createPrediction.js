
import { config } from "../../../config.js";
import { getPredictionsChannel } from "../../lib/discordBot.js";
import { getFormatedMatches } from "../../lib/getMatches.js";

const { predictionsMessage } = config;

export async function createPrediction(client) {
  const channel = await getPredictionsChannel(client);
  const matches = await getFormatedMatches();

  const messages = await createPredictionMessages(channel, matches);

  return messages;
}

async function createPredictionMessages(channel, matches) {
  const messages = [];

  await channel.send(predictionsMessage);

  for (const match of matches) {
    const team1 = match.teams[0];
    const team2 = match.teams[1];

    const message = await channel.send(`${team1.code} vs ${team2.code}`);
    await message.react("🔵");
    await message.react("🔴");

    messages.push({
      messageId: message.id,
      name: `${team1.code}_vs_${team2.code}`,
      blue: team1.code,
      red: team2.code,
    });
  }

  return messages;
}
