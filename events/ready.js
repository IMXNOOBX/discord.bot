module.exports.run = async (client) => {
  client.log.console(
    `[BOT] | Username: ${client.user.tag} | Guilds: ${client.guilds.cache.size} servers | Users: ${client.users.cache.size} total users`
  );
  client.user.setStatus("dnd"); // online, idle, dnd, invisible
  const statuses = [
    `${client.guilds.cache.size} Guilds`,
    `${client.users.cache.size} Users`,
    `github.com/IMXNOOBX`,
  ];
  setInterval(() => {
    const status = statuses[Math.floor(Math.random() * statuses.length)]; //Easy way to make random dynamic statuses
    client.user.setActivity(status, { type: "WATCHING" }); //LISTENING, WATCHING, PLAYING
  }, 60000);
};
