import { DiscordjsError } from "discord.js";
import log from "../../utilities/log";

export const event = 'error';

export const run = async (error: DiscordjsError) => {
    log.error(`bot - WebSocket error: ${error}`);
}
