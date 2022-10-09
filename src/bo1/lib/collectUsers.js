import { getUsers } from "../../lib/getUsersFromReaction.js";
import { getPredictionsChannel } from "../../lib/discordBot.js";


export const collectUsers = async (messages, client) => {
  const channel = await getPredictionsChannel(client)

  const users = [];
  for (const e of messages) {
  
    const msg = await channel.messages.fetch(e.messageId);
    const blue = await getUsers(msg, "🔵");
    const red = await getUsers(msg, "🔴");

    users.push([{name: e.blue, users: blue}, {name: e.red, users: red}]);
  }

  return users;
};
