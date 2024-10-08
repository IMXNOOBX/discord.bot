const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs')
let slashCmd = []

module.exports = (client) => {
    client.log.console('[SLASH] | Loading slash commands...');

    const files = readdirSync(`./commands/slash/`)
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    for (let file of files) {
        let slash = require(`../commands/slash/${file}`);

        if (
            !slash.name || 
            !slash.description ||
            !slash.run || typeof slash.run !== 'function'
        ) {
            client.log.error(`[SLASH] | Error loading: ${file} (missing name, description or run function)`);
            continue;
        }

        if (slash.disabled)
            continue;

        const data = {
            name: slash.name,
            description: slash.description,
            options: slash.options || [],
            type: slash.type || 1,
            integration_types: slash.integration_types || [0],
            contexts: slash.contexts || [0],
        };

        client.commands.slash.set(slash.name, slash);
        slashCmd.push(data);
    }

    client.log.console(`[SLASH] | Loaded ${slashCmd.length}/${files.length} slash commands`);

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
            }).setToken(process.env.BOT_TOKEN);

            await rest.put(
                Routes.applicationCommands(client.user.id), {
                    body: slashCmd
                },
            );

            client.log.console('[SLASH] | Slash commands registered sucessfully!');
        })
}
