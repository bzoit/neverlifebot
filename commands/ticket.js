const Discord = require('discord.js');

module.exports = {
	name: 'ticket',
	aliases: ['suggestion', 'idea', 'task', 'bug', 'report', 'bugreport'],
	async execute(message, args) {
        let answered = false
        const categoryEmbed = new Discord.MessageEmbed()
            .setColor(0x00e1ff)
            .setTitle('Category')
            .addField('What category does your ticket belong with?', '> `suggestion`, `bug`, `other`')
            .addField('\u200b', 'Respond with `cancel` to cancel this ticket.')
            .setFooter('Prompt will timeout in 5 minutes.')
        await message.author.send(categoryEmbed)
        const filter = m => m.author.id === message.author.id;
        message.author.dmChannel.awaitMessages(filter, {
            max: 1,
            time: 300000,
        }).then(collected => {
                if(collected.first().content === 'cancel') {
                    const cancelEmbed = new Discord.MessageEmbed()
                        .setColor(0x00e1ff)
                        .setTitle('Canceled')
                    message.author.send(cancelEmbed)
                } else if(collected.first().content === 'suggestion') {
                    const data = async() => {
                        const oneEmbed = new Discord.MessageEmbed()
                            .setColor(0x00e1ff)
                            .setTitle('Please Describe Your Suggestion.')
                            .setFooter('Prompt will timeout in 10 minutes.')
                        await message.author.send(oneEmbed)
                        message.author.dmChannel.awaitMessages(filter, {
                            max: 1,
                            timeout: 600000,
                        }).then(collected => {
                            const body = collected.first().content;
                            message.author.send('Ticket sent to ColdHaven developers.')
                            const category = 'Suggestion'
                            const ticketEmbed = new Discord.MessageEmbed()
                                .setColor(0x00e1ff)
                                .setTitle(category)
                                .setDescription(body)
                                .setFooter(`Sent by ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                                const hrchannel = message.guild.channels.cache.get('860087649070219279');
                                hrchannel.send(ticketEmbed)
                        })
                    }
                    data();
                } else if(collected.first().content === 'bug') {
                    const data = async() => {
                        const twoEmbed = new Discord.MessageEmbed()
                            .setColor(0x00e1ff)
                            .setTitle('Please Describe the Bug.')
                            .setFooter('Prompt will timeout in 10 minutes.')
                        await message.author.send(twoEmbed)
                        message.author.dmChannel.awaitMessages(filter, {
                            max: 1,
                            timeout: 600000,
                        }).then(collected => {
                            const body = collected.first().content;
                            message.author.send('Ticket sent to ColdHaven developers.')
                            const category = 'Bug'
                            const ticketEmbed = new Discord.MessageEmbed()
                                .setColor(0x00e1ff)
                                .setTitle(category)
                                .setDescription(body)
                                .setFooter(`Sent by ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                                hrchannel = message.guild.channels.cache.get('860087649070219278');
                                hrchannel.send(ticketEmbed)
                        })
                    }
                    data()
                } else if(collected.first().content === 'other') {
                    const data = async() => {
                        const threeEmbed = new Discord.MessageEmbed()
                            .setColor(0x00e1ff)
                            .setTitle('Please Describe Your Feature.')
                            .setFooter('Prompt will timeout in 10 minutes.')
                        await message.author.send(threeEmbed)
                        message.author.dmChannel.awaitMessages(filter, {
                            max: 1,
                            timeout: 600000,
                        }).then(collected => {
                            const body = collected.first().content;
                            message.author.send('Ticket sent.')
                            const category = 'Other'
                            const ticketEmbed = new Discord.MessageEmbed()
                                .setColor(0x00e1ff)
                                .setTitle(category)
                                .setDescription(body)
                                .setFooter(`Sent by ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                            hrchannel = message.guild.channels.cache.get('860087649070219279');
                            hrchannel.send(ticketEmbed)
                        })
                    }
                    data()
                } else {
                    const invalidEmbed = new Discord.MessageEmbed()
                        .setColor(0x00e1ff)
                        .setTitle('Invalid Statement!')
                    message.author.send(invalidEmbed)
                }

            const category = collected.first().content;
        })
	},
};