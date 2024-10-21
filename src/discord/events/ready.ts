import { ActivityType } from 'discord.js';
import { client } from '@/discord';

export const event = 'ready';

export const run = async () => {
  if (!client || !client.user) return; // Will never happen, just to make TS happy

  console.log(
    `[BOT] | ${client.user.tag} [${process.env.BOT_PREFIX || '!'}][Server Only: ${process.env.BOT_SERVERONLY ? 'Yes' : 'No'}] | Guilds: ${client.guilds.cache.size}, Users: ${client.users.cache.size} in total`
  );

  client.user.setStatus("dnd"); // online, idle, dnd, invisible

  const set_activity = async () => {

    // Redefine inside the function to get the updated values
    const statuses = [
      `${client.guilds.cache.size} Guilds`,
      `${client.users.cache.size} Users`,
      `github.com/IMXNOOBX`,
    ];


    const status = statuses[Math.floor(Math.random() * statuses.length)];

    if (client.user) 
        client.user.setActivity(status, { type: ActivityType.Competing });
  }

  setInterval(set_activity, 30 * 1000); 
  set_activity();
};
