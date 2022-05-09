module.exports.run = async (client, interaction) => {
    if (interaction.isCommand()) { // First check if the interaction is a command registered in hSlash.js
        await interaction.deferReply({ ephemeral: false }).catch(() => { }); // if ephemeral: true all the slash commands will be answered as ephemeral and only the executor user will be able to see them

        if (interaction.guildId == null) return; //yep

        const command = client.commands.slash.get(interaction.commandName);
        if (!command) return;

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        try {
            command.run(client, interaction, args)
        } catch (e) {
            interaction.followUp({ content: `${client.emotes.bug} - Error: something weird happened, the error has been reported!`, ephemeral: true });
            client.log.error(e)
        }

    }

}

