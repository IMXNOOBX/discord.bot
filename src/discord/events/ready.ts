import { ActivityType } from 'discord.js';
import discord from '@/discord';
import log from "@utils/log";

export const event = 'ready';

export const run = async () => {
  const client = discord.client;

  if (!client.user) return log.warn('bot - Cosmic radiation flipped a byte and now the user is missing!');

  log.info(
    `bot - ${client.user.tag} guilds: {${client.guilds.cache.size}}, users: {${client.users.cache.size}}`
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
