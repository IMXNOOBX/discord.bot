import { Guild } from "discord.js";
import log from "@utils/log";

export const event = 'guildCreate';

export const run = async (guild: Guild) => {
    log.info(`bot - Joined guild ${guild.name} (${guild.id})`);
}

