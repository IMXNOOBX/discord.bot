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

                const dev = process.env.NODE_ENV === 'development';

                interaction
                    .followUp({ 
                        content: dev ? 
                            `(**Developer Mode**) An exception occurred while executing this(\`${command.name}\`) command:\n\`\`\`js\n${e}\`\`\`` :
                            'Something went wrong while executing this command, please try again later.', 
                        ephemeral: true 
                    })
                    .catch(e => e);
            });
    }

    if (interaction.isAutocomplete()) {
        const command = discord.commands.get(interaction.commandName);

        if (!command) return;
        if (!command.autocomplete) {
            log.error(`Auto-Complete (${command.name}) is not implemented`);
            return;
        }

        command
            .autocomplete(interaction)
            .catch((e: any) => {
                log.error(`Auto-Complete (${command.name}) ${e}`);
            });
    }

    if (interaction.isButton()) {
        const commandName = interaction.message.interaction?.commandName
        if (!commandName) return;

        const command = discord.commands.get(commandName);
        
        if (!command) return;
        if (!command.button) {
            log.error(`Button (${command.name}) is not implemented`);
            return;
        }

        await interaction
            .deferReply({ ephemeral: command.ephemeral || false })
                .catch(() => { }); // Catch any error
            
        command
            .button(interaction)
            .catch((e: any) => {
                log.error(`Button (${command.name}) ${e}`);

                const dev = process.env.NODE_ENV === 'development';

                interaction
                    .reply({ 
                        content: dev ? 
                            `(**Developer Mode**) An exception occurred while executing this(\`${command.name}\`) button:\n\`\`\`js\n${e}\`\`\`` :
                            'Something went wrong while executing this button, please try again later.', 
                        ephemeral: true 
                    })
                    .catch(e => e);
            });
    }

    if (interaction.isAutocomplete()) {
        const command = discord.commands.get(interaction.commandName);

        if (!command) return;
        if (!command.autocomplete) {
            log.error(`Auto-Complete (${command.name}) is not implemented`);
            return;
        }

        command
            .autocomplete(interaction)
            .catch((e: any) => {
                log.error(`Auto-Complete (${command.name}) ${e}`);
            });
    }
}