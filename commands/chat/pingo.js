module.exports = {
  name: 'pingo',
  aliases: ['ping'],
  run: async (client, message, args) => {
    message.channel.send({ content: `ping? ${client.ws.ping}` })
  }
}