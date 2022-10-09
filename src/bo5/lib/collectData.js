import { getPredictionsChannel } from "../../lib/discordBot.js";
import { getUsers } from "../../lib/getUsersFromReaction.js";

const reactions = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
const results = ["3-0", "3-1", "3-2", "2-3", "1-3", "0-3"];

export async function collectData(client, messages) {
  const channel = await getPredictionsChannel(client);
  const data = [];
  for (const e of messages) {
    const d = {
      team1: e.team1,
      team2: e.team2,
      data: [],
    };
    const msg = await channel.messages.fetch(e.messageId);
    for (let i = 0; i < reactions.length; i++) {
      const users = await getUsers(msg, reactions[i]);
      const result = results[i];
      d.data.push({
        result,
        users,
      });
    }
    data.push(d);
  }
  return data;
}
