const { readdirSync } = require('fs')
let slashCmd = []
module.exports = (client) => {

    readdirSync('./cmds/slashCommands/').forEach(dir => {
        const commands = readdirSync(`./cmds/slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            let slah = require(`../cmds/slashCommands/${dir}/${file}`);

            if (slah.name) {
                client.commands.slash.set(slah.name, slah);
                slashCmd.push(slah);
            } else {
                client.log.error('[BOT] | Error Loading: ' + slah.name)
                continue;
            }

        }
    });

    client.log.console('[BOT] | Slash Commands Loaded Sucessfully!');

    client.on('ready', async () => {
        await client.application.commands.set(slashCmd) //Registering new slash comands
    })

}
