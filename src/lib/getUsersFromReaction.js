export async function getUsers(message, emoji) {
  const sumUsers = [];
  let lastId;

  while (true) {
    const options = { limit: 100 };
    if (lastId) {
      options.after = lastId;
    }

    const messages = await message.reactions.cache
      .get(emoji)
      .users.fetch(options);
    sumUsers.push(...Array.from(messages));

    if (messages.size != 100) {
      break;
    }
    lastId = messages.last().id;
  }

  const usersArr = sumUsers.map((userObj) => {
    const obj = {
      username: userObj[1].username,
      tag: userObj[1].discriminator,
      id: userObj[1].id,
    };
    return obj;
  });

  return usersArr;
}