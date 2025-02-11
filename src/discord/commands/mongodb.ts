import { 
    ChatInputCommandInteraction, 
    ApplicationCommandOptionType 
} from "discord.js"
import discord from '@/discord';
import log from "@utils/log";

export default {
    name: 'mongodb',
    description: 'Shows how to use MongoDB plugin',
    options: [
        {
            name: "show",
            description: "Do you want to dump the database to the chat?",
            type: ApplicationCommandOptionType.Boolean, // boolean
            required: false
        },
        {
			name: "user",
			description: "Add new user to the database, to add the email separate with a comma",
			type: ApplicationCommandOptionType.String, // String
			required: false
		},
    ],
    disabled: process.env.NODE_ENV !== 'development',
    run: async (interaction: ChatInputCommandInteraction) => {
        const mongodb = discord.plugins.get('mongodb')

        if (!mongodb) 
            return interaction.followUp({ content: `> 🤯 MongoDB plugin not loaded` });

        const djs_user = mongodb.data.djs_user; // This is the object you returned from the init function

        const show = interaction.options.getBoolean('show')
        const user = interaction.options.getString('user')

        if (
            show
        )  {
            const users = await djs_user.find()

            return interaction.followUp({ content: `> 😉 Users: ${users.map((u: any) => u.username).join(', ') || 'No users in the db'}` })
        }

        if (
            user
        ) {
            const username = user.includes(',') ? user.split(',')[0].trim() : user.trim()
            const email =  user.includes(',') ? user.split(',')[1].trim() : null

            if (!username) 
                return interaction.followUp({ content: `> 🩻 You need to provide a username` })

            const new_user = await djs_user.create({ 
                username, 
                email: email || 'no@email.com' 
            });

            return interaction.followUp({ content: `> 🚀 User added: ${username}` })
        }

        return interaction.followUp({ content: `> 🤨 This is not how you should use the command >:(` })
    }
}
