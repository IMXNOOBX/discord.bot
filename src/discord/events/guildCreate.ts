import { Guild } from "discord.js";

export const event = 'guildCreate';

export const run = async (guild: Guild) => {
    console.log(`[BOT] | Joined guild ${guild.name} (${guild.id})`);
}

