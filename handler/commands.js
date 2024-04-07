const { readdirSync } = require('fs')

module.exports = (client, log) => {
    const commands = readdirSync(`./commands/chat/`)
        .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    for (let file of commands) {
        let cmd = require(`../commands/chat/${file}`);

        if (cmd.name) {
            client.commands.normal.set(cmd.name, cmd);
        } else {
            client.log.error('[BOT] | Error Loading: ' + cmd.name)
            continue;
        }

        if (cmd.aliases && Array.isArray(cmd.aliases))
            cmd.aliases.forEach(alias => client.commands.normal.aliases.set(alias, cmd.name));
    }
    client.log.console('[BOT] | Chat commands loaded sucessfully!');
}