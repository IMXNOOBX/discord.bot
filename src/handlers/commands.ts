import fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { client, commands, aliases } from '@/discord';

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
            console.log(`[COMMANDS] | Error loading: ${file} (missing name or run function) ${typeof cmd.run}`);
            continue;
        }

        console.log(`[COMMANDS] | Loaded command: ${cmd.name}`);
        commands.set(cmd.name, cmd);

        if (cmd.aliases && Array.isArray(cmd.aliases))
            cmd.aliases.forEach((alias: string) => aliases.set(alias, cmd.name));
    }

    console.log(`[COMMANDS] | Loaded ${commands.size} commands`);

        /**
     * @brief Register slash commands once the bot is ready
     * @deprecated This doesnt work properly, use the REST API instead
     * client
     *     .on('ready', async () => await client.application.commands.set(slashCmd))
     */

    client
        .on('ready', async () => {
            const rest = new REST({
                version: '9'
            }).setToken(process.env.BOT_TOKEN as string);

            await rest.put(
                Routes.applicationCommands(client.user?.id as string), {
                    body: commands
                },
            );

            console.log('[BOT] | slash commands registered successfully!');
        })
}