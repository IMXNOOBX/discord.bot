const { readdirSync } = require('fs')

module.exports = (client) => {
    client.log.console('[CHAT] | Loading chat commands...');

    const files = readdirSync(`./commands/chat/`)
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    for (let file of files) {
        let cmd = require(`../commands/chat/${file}`);

        if (
            !cmd.name ||
            !cmd.run || typeof cmd.run !== 'function'
        ) {
            client.log.error(`[CHAT] | Error loading: ${file} (missing name, description or run function)`);
            continue;
        }

        client.commands.normal.set(cmd.name, cmd);

        if (cmd.aliases && Array.isArray(cmd.aliases))
            cmd.aliases.forEach(alias => client.commands.normal.aliases.set(alias, cmd.name));
    }
    
    client.log.console(`[CHAT] | Loaded ${client.commands.normal.size}/${files.length} chat commands`);
}