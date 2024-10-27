import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import discord from '../discord';
import log from "../utilities/log"

export default async () => {
    const root = __dirname + '/../discord/commands';
    const files = fs
        .readdirSync(root)
        .filter(file => 
            file.endsWith('.js') || file.endsWith('.ts')
        );

    for (const file of files) {
        let cmd = await import(`${root}/${file}`);

        cmd = cmd.default || cmd;

        if (
            !cmd.name ||
            !cmd.run || typeof cmd.run !== 'function'
        ) {
            log.info(`commands - Error loading: ${file} (missing name or run function) ${typeof cmd.run}`);
            continue;
        }

        discord.commands.set(cmd.name, cmd);

        if (cmd.aliases && Array.isArray(cmd.aliases))
            cmd.aliases.forEach((alias: string) => discord.aliases.set(alias, cmd.name));
    }

    log.info(`commands - Loaded ${discord.commands.size} commands: ${[...discord.commands.keys()].join(', ')}`);

        /**
     * @brief Register slash commands once the bot is ready
     * @deprecated This doesnt work properly, use the REST API instead
     * client
     *     .on('ready', async () => await client.application.commands.set(slashCmd))
     */

        discord.client
        .on('ready', async () => {
            const rest = new REST({
                version: '9'
            }).setToken(process.env.BOT_TOKEN as string);

            await rest.put(
                Routes.applicationCommands(discord.client.user?.id as string), {
                    body: discord.commands
                },
            );

            log.info('bot - Slash commands registered successfully!');
        })
}