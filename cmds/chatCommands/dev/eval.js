//took this from an old bot im testing the new discord buttons

module.exports = {
    name: 'eval',
    usage: "",
    description: 'evaluates any string as javascript code and executes it.',
    run: async (client, message, args) => {
        if(message.author.id !== client.config.dev.owner_id) return message.channel.send("sorry, this command is only for the developer")

        const toeval = args.join(" ");
        if(!toeval) return message.channel.send("you must write a command")
        let evaledTime = message.createdTimestamp - Date.now();

        const toevalEmbed = new client.discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle("Confirmation!")
            .addField("**Input**\nDo you realy want to run that command?", `\`\`\`js\n${toeval}\`\`\``)
        const cancelEmbed = new client.discord.MessageEmbed()
            .setColor("RED")
            .setTitle("Cancelled!")

        const confirmButton = new client.discord.MessageButton()
            .setCustomId('confirmEval')
            .setLabel('Run')
            .setStyle('SUCCESS')
        const cancelButton = new client.discord.MessageButton()
            .setCustomId('cancelEval')
            .setLabel('Cancel')
            .setStyle('DANGER')
        const theButtons = new client.discord.MessageActionRow().addComponents([confirmButton, cancelButton]);
        function evalCommand(msg){
            try {
                let words = ["token", "destroy"]
                if(words.some(word => message.content.toLowerCase().includes(word))){
                    return message.channel.send("Those words are blacklisted!")
                }
                const evaled = eval(toeval)

                const resultEmbed = new client.discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("correctly evaluated")
                .addField(`**Type:**`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
                .addField("**Evaluated in:**", `\`\`\`yaml\n${evaledTime} ms\`\`\``, true)
                .addField("**Entrance**", `\`\`\`js\n${toeval}\`\`\``)
                .addField("**Output**", `\`\`\`js\n${evaled} \`\`\``)

                msg.edit({embeds: [resultEmbed], components: []});

            }catch (error) {
                const errorEmbed = new client.discord.MessageEmbed()
                .setColor("RED")
                .addField(`Entrance`, `\`\`\`js\n${args}\`\`\``)
                .addField(`Error`, `\`\`\`js\n${error}\`\`\` `)
                msg.edit({embeds: [errorEmbed], components: [] });
            }
        }

        message.channel.send({embeds: [toevalEmbed], components: [theButtons] }).then(async (msg) => { //Credits to https://www.youtube.com/watch?v=zzErSRCado0 for the buttons :D
            let filter = i => i.user.id === message.author.id
            let collector = await msg.createMessageComponentCollector({filter: filter, time: 15000});
            collector.on('collect', async(btn) => {
                if(btn.isButton()){
                    await btn.deferUpdate().catch(e => {});
                    if(btn.customId === 'confirmEval'){
                        evalCommand(msg);
                    } else if(btn.customId === 'cancelEval'){
                        msg.edit({embeds: [cancelEmbed], components: [] });
                    }
                }
            })
        })
    }}