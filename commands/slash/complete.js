module.exports = {
    name: 'complete',
    description: 'Show how to use many diferent options in a command',
    run: async (client, interaction) => {
        interaction.followUp({ content: `🚀 ping? *\`${client.ws.ping}\`*` })
    }
}
