import { Interaction, ApplicationCommandOptionType } from "discord.js";
import discord from "../../discord";
import log from "../../utilities/log";

export const event = 'interactionCreate';

export const run = async (interaction: Interaction) => {
    if (interaction.isCommand()) { // First check if the interaction is a type command
        // if (!interaction.guildId) // Check if the interaction is in a guild
        //     return;

        const command = discord.commands.get(interaction.commandName);

        if (!command) return;

        /**
         * @brief Defer the reply to avoid the 3 seconds timeout
         * @note if ephemeral is true only the executor user will be able to see the response
         */
        await interaction
            .deferReply({ ephemeral: command.ephemeral || false })
            .catch(() => { });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === ApplicationCommandOptionType.Subcommand) {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        command
            .run(interaction, args)
            .catch((e: any) => {
                log.error(`Command (${command.name}) ${e}`);

                interaction
                    .followUp({ content: `Error: ${e}`, ephemeral: true })
                    .catch(e => e);
            });
    }

    if (interaction.isAutocomplete()) {
        const command = discord.commands.get(interaction.commandName);

        if (!command) return;
        if (!command.autocomplete) return;

        command
            .autocomplete(interaction)
            .catch((e: any) => {
                log.error(`Auto-Complete (${command.name}) ${e}`);
            });
    }
}