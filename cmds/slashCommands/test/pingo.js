module.exports = {
    name: 'pingo',
    description: 'Check bots ping',
    run: async (client, interaction) => {
        interaction.followUp({ content: client.ws.ping + 'ms' })
    }
}
