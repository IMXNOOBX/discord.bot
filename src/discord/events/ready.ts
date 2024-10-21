import { ActivityType } from 'discord.js';
import { client } from '@/discord';
import log from "@/utilities/log"

export const event = 'ready';

export const run = async () => {
  if (!client || !client.user) return; // Will never happen, just to make TS happy

  log.info(
    `bot - ${client.user.tag} (Server Only: ${process.env.BOT_SERVERONLY ? 'Yes' : 'No'}) guilds: {${client.guilds.cache.size}}, users: {${client.users.cache.size}}`
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
