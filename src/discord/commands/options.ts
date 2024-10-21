import { ChatInputCommandInteraction } from "discord.js"
import log from "@/utilities/log"

/**
 * @brief This is a complete example of a slash command with many different options
 * @see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
 */

export default {
    name: 'options',
    description: 'Show how to use many different options in a command',
    options: [
        {
			name: "string",
			description: "String command option",
			type: 3, // String
			required: false
		},
        {
            name: "integer",
            description: "Number command option",
            type: 4, // Integer
            required: false
        },
        {
            name: "boolean",
            description: "Yes/No command option",
            type: 5, // boolean
            required: false
        },
        {
            name: "user",
            description: "User command option",
            type: 6, // User
            required: false
        },
        {
            name: "channel",
            description: "Channel command option",
            type: 7, // Channel
            required: false
        },
        {
            name: "role",
            description: "Role command option",
            type: 8, // Role
            required: false
        },
        {
            name: "mentionable",
            description: "Mentionable command option",
            type: 9, // Mentionable
            required: false
        },
        {
            name: "number",
            description: "Number command option",
            type: 10, // Number
            required: false
        },
        {
            name: "attachment",
            description: "Attachment command option",
            type: 11, // Attachment
            required: false
        },
    ],
    run: async (interaction: ChatInputCommandInteraction) => {
        const string = interaction.options.getString('string') || 'No string provided';
        const integer = interaction.options.getInteger('integer') || 'No integer provided';
        const boolean = interaction.options.getBoolean('boolean') || 'No boolean provided';
        const user = interaction.options.getUser('user') || '';
        const channel = interaction.options.getChannel('channel') || 'No channel provided';
        const role = interaction.options.getRole('role') || 'No role provided';
        const mentionable = interaction.options.getMentionable('mentionable') || 'No mentionable provided';
        const number = interaction.options.getNumber('number') || 'No number provided';
        const attachment = interaction.options.getAttachment('attachment')?.name || 'No attachment provided';

        log.info(
            'string:', string, 
            '\ninteger:', integer, 
            '\nboolean:', boolean, 
            '\nuser:', user, 
            '\nchannel', channel, 
            '\nrole:', role, 
            '\nmentionable:', mentionable,
            '\nnumber:', number, 
            '\nattachment:', attachment
        )
        
        interaction.followUp({
            content: `> String: ${string}\nInteger: ${integer}\nBoolean: ${boolean}\nUser: ${user}\nChannel: ${channel}\nRole: ${role}\nMentionable: ${mentionable}\nNumber: ${number}\nAttachment: ${attachment}`.slice(0, 4000)
        });
        
        interaction.followUp({
            content: '> 🧩 Check the console for the full output & details',
        });
    }
}
