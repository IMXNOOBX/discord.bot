import { ChatInputCommandInteraction } from "discord.js"
import { plugins } from "@/discord"

export default {
    name: 'mongodb',
    description: 'Shows how to use MongoDB plugin',
    options: [
        {
            name: "show",
            description: "Do you want to dump the database to the chat?",
            type: 5, // boolean
            required: false
        },
        {
			name: "user",
			description: "Add new user to the database, to add the email separate with a comma",
			type: 3, // String
			required: false
		},
    ],
    run: async (interaction: ChatInputCommandInteraction) => {
        const mongodb = plugins.get('mongodb')

        if (
            !mongodb
        ) 
        return interaction.followUp({ content: `> 🤯 MongoDB plugin not loaded` });

        const { models } = await mongodb;

        const show = interaction.options.getBoolean('show')
        const user = interaction.options.getString('user')

        if (
            show
        )  {
            const users = await models.User.find()

            return interaction.followUp({ content: `> 😉 Users: ${users.map((u: any) => u.username).join(', ') || 'No users in the db'}` })
        }

        if (
            user
        ) {
            const username = user.includes(',') ? user.split(',')[0].trim() : user.trim()
            const email =  user.includes(',') ? user.split(',')[1].trim() : null

            if (
                !username
            ) return interaction.followUp({ content: `> 🩻 You need to provide a username` })

            const newUser = new models.User({ username, email: email || 'no@email.com' })
            await newUser.save()

            return interaction.followUp({ content: `> 🚀 User added: ${username}` })
        }

        return interaction.followUp({ content: `> 🤨 This is not how you should use the command >:(` })
    }
}
