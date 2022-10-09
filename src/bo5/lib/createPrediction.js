

import { config } from "../../../config.js";
import { getPredictionsChannel } from "../../lib/discordBot.js";
import { getFormatedMatches } from "../../lib/getMatches.js";

const reactions = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣']
const {predictionsMessage} = config

export async function createPrediction(client) {
  const channel = await getPredictionsChannel(client);
  const matches = await getFormatedMatches();

  const messages = createPredictionMessages(channel, matches);

  return messages;
}

async function createPredictionMessages(channel, matches) {
  const messages = [];

  channel.send(predictionsMessage);

  for (const match of matches) {
    const team1 = match.teams[0].code
    const team2 = match.teams[1].code

    const message = await channel.send(`${team1} vs ${team2}`);
    for (const reaction of reactions) {
      await message.react(reaction);
    }

    messages.push({
      messageId: message.id,
      name: `${team1}_vs_${team2}`,
      startTime: match.startTime,
      team1,
      team2
    });
  }

  return messages;
}