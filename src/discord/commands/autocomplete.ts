import { ChatInputCommandInteraction, AutocompleteInteraction } from "discord.js"
import log from "@/utilities/log"
/**
 * @brief This is a complete example of a slash command with many different options
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
 */

export default {
    name: 'autocomplete',
    description: 'Show how to use the auto complete in a command',
    options: [
        {
            name: "amazing",
            description: "Discord.js is amazing isn't it?",
            type: 5, // boolean
            required: true
        },
        {
			name: "wow",
			description: "I can show you different options dynamically in an option using auto complete",
			type: 3, // String,
			autocomplete: true,
			required: true
		}
    ],
    autocomplete: async (interaction: AutocompleteInteraction) => {
        const option = interaction.options.getFocused(true);

		const options = [];

		switch (option.name) {
			case "wow":
                if (
                    !interaction.member
                ) {
                    options.push({
                        name: 'I cannot find you, where are you? 😢',
                        value: 'no_guild',
                    });
                    return;
                }

                for (let i = 0; i < 25; i++) {
                    const rand = Math.floor(Math.random() * 999) + i
                    options.push({
                        name: `Option ${i} with a random value: ${rand}`,
                        value: `option_${i}_${rand}`,
                    });
                }

                break;
        }

        // This will truncate the list to 25 options, and filter them to only include options that match the user's input
        const filter = options.filter(opt => opt.name.toLowerCase().includes(option.value.toLowerCase())).slice(0, 25);

        if (!interaction)
			return;

		await interaction.respond(
			filter
		)
			.catch(() => { });
    },
    run: async (interaction: ChatInputCommandInteraction) => {
        const amazing = interaction.options.getBoolean('amazing');
        const wow = interaction.options.getString('wow');

        if (!wow || !amazing)
            return interaction.followUp({
                content: '> 🚧 Invalid options selected',
            });

        log.info(
            'Amazing:', amazing,
            'Wow:', wow
        )

        if (wow.split('_').length !== 3) 
            return interaction.followUp({
                content: '> 🚧 Invalid wow option selected',
            });
        
        interaction.followUp({
            content: `> ${amazing ? 'Discord.js is amazing! 🎉' : 'Discord.js is not amazing 😢'}\nAnd you have selected the option: ${wow.split('_')[1]} with the value ${wow.split('_')[2]}`,
        });
    }
}
