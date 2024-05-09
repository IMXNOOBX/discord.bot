module.exports.run = async (client) => {
  client.log.console(
    `[BOT] | ${client.user.tag} [${process.env.BOT_PREFIX || '!'}][SO: ${process.env.BOT_SERVERONLY ? 'Yes' : 'No'}] | Guilds: ${client.guilds.cache.size}, Users: ${client.users.cache.size} in total`
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
