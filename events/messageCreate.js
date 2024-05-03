module.exports.run = async (client, message) => {
    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(client.config.prefix)) return;
    if (!message.member) message.guild.fetchMembers(message);

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g); // SCLICE to remove prefix, TRIM to remove spaces and SPLIT to make content in array
    const cmd = args.shift().toLowerCase(); // SHIFT commands to remove the prefix and toLowerCase to avoid capital letter like '!HeLp MoDeRaTiOn' 
    if (cmd.length === 0) return;
    let command = client.commands.normal.get(cmd);
    if (!command) command = client.commands.normal.find(a => a.aliases && a.aliases.includes(cmd)); //Check aliases to use as commands

    if (!command) return; // if no command found (alias either) return

    command
        .run(client, message, args) // if  a command is found run it :D
        .catch(e => {
            client.log.error(e)
            message.channel.send(`Error: ${e?.message || e}`)
                .then(msg => setTimeout(() => msg.delete(), 15000))
        });
}