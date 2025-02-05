import { 
    ChatInputCommandInteraction 
} from "discord.js"

export default {
    name: 'pingo',
    description: 'Check bots ping',
    run: async (interaction: ChatInputCommandInteraction) => { // This interaction is made via chat so it is a ChatInputCommandInteraction
        interaction.followUp({ content: `> 🚀 ping? *\`${interaction.client.ws.ping}\`*` })
    }
}
