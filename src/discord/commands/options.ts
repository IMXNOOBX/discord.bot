import { 
    ChatInputCommandInteraction, 
    ApplicationCommandOptionType 
} from "discord.js"
import log from "@utils/log";

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
			type: ApplicationCommandOptionType.String, // String
			required: false
		},
        {
            name: "integer",
            description: "Number command option",
            type: ApplicationCommandOptionType.Integer, // Integer
            required: false
        },
        {
            name: "boolean",
            description: "Yes/No command option",
            type: ApplicationCommandOptionType.Boolean, // boolean
            required: false
        },
        {
            name: "user",
            description: "User command option",
            type: ApplicationCommandOptionType.User, // User
            required: false
        },
        {
            name: "channel",
            description: "Channel command option",
            type: ApplicationCommandOptionType.Channel, // Channel
            required: false
        },
        {
            name: "role",
            description: "Role command option",
            type: ApplicationCommandOptionType.Role, // Role
            required: false
        },
        {
            name: "mentionable",
            description: "Mentionable command option",
            type: ApplicationCommandOptionType.Mentionable, // Mentionable
            required: false
        },
        {
            name: "number",
            description: "Number command option",
            type: ApplicationCommandOptionType.Number, // Number
            required: false
        },
        {
            name: "attachment",
            description: "Attachment command option",
            type: ApplicationCommandOptionType.Attachment, // Attachment
            required: false
        },
    ],
    disabled: process.env.NODE_ENV !== 'development',
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
