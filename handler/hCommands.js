const { readdirSync } = require('fs')

module.exports = (client, log) => {
    readdirSync('./cmds/chatCommands/').forEach(dir => {
        const commands = readdirSync(`./cmds/chatCommands/${dir}/`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            let cmd = require(`../cmds/chatCommands/${dir}/${file}`);

            if (cmd.name) {
                client.commands.normal.set(cmd.name, cmd);
            } else {
                client.log.error('[BOT] | Error Loading: ' + cmd.name)
                continue;
            }

            if (cmd.aliases && Array.isArray(cmd.aliases))
                cmd.aliases.forEach(alias => client.commands.normal.aliases.set(alias, cmd.name));
        }
    });
    client.log.console('[BOT] | Commands Loaded Sucessfully!');
}