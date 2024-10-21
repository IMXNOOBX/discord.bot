import { Guild } from "discord.js";

export const event = 'guildDelete';

export const run = async (guild: Guild) => {
    console.log(`[BOT] | Removed from guild ${guild.name} (${guild.id})`);
}
