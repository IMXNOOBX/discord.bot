import { DiscordjsError } from "discord.js";
export const event = 'error';

export const run = async (error: DiscordjsError) => {
    console.error(`[BOT] | WebSocket error: ${error}`);
}
