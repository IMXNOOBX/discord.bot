module.exports = {
    name: 'pingo',
    description: 'Check bots ping',
    run: async (client, interaction) => {
        interaction.followUp({ content: `> 🚀 ping? *\`${client.ws.ping}\`*` })
    }
}
