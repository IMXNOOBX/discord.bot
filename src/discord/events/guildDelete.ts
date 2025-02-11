import { Guild } from "discord.js";
import log from "@utils/log";

export const event = 'guildDelete';

export const run = async (guild: Guild) => {
    log.info(`bot - Removed from guild ${guild.name} (${guild.id})`);
}
