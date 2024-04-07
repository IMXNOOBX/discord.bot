module.exports.run = async (client) => {
  client.log.console(
    `[BOT] | Username: ${client.user.tag} | Guilds: ${client.guilds.cache.size} servers | Users: ${client.users.cache.size} total users`
  );
  client.user.setStatus("dnd"); // online, idle, dnd, invisible

  const set_activity = async () => {
    const statuses = [
      `${client.guilds.cache.size} Guilds`,
      `${client.users.cache.size} Users`,
      `github.com/IMXNOOBX`,
    ];
    const status = statuses[Math.floor(Math.random() * statuses.length)]; // Easy way to make random dynamic statuses
    client.user.setActivity(status, { type: client.discord.ActivityType.Watching }); // LISTENING, WATCHING, PLAYING
  }

  setInterval(set_activity, 30 * 1000); set_activity();
};
