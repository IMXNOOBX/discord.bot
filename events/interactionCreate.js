module.exports.run = async (client, interaction) => {
    if (interaction.isCommand()) { // First check if the interaction is a type command
        if (
            process.env.BOT_SERVERONLY == 1 &&
            interaction.guildId == null
        ) return;

        const command = client.commands.slash.get(interaction.commandName);
        if (!command) return;

        /**
         * @brief Defer the reply to avoid the 3 seconds timeout
         * @note if ephemeral is true only the executor user will be able to see the response
         */
        await interaction
            .deferReply({ ephemeral: command.ephemeral || false })
            .catch(() => { }); // Catch any error


        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        command
            .run(client, interaction, args)
            .catch(e => {
                client.log.error(e)
                interaction
                    .followUp({ content: `Error: ${e}`, ephemeral: true })
                    .catch(e => e);
            });
    }

    if (interaction.isAutocomplete()) {
        const command = client.commands.slash.get(interaction.commandName);

        if (!command) return;

        command
            .autocomplete(client, interaction)
            .catch(e => {
                client.log.error("Auto complete exception: " + e);
            });
    }
}