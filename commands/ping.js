const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'ping',
	aliases: ['uptime', 'api'],
	async execute(message) {
		message.channel.send('Pong!').then(msg => {
			const ping = msg.createdTimestamp - message.createdTimestamp;
			const pingEmbed = new Discord.MessageEmbed()
				.addField(`:ping_pong: Ping`, `\`${ping}ms\``)
				.addField(':hourglass: Uptime', `\`${ms(message.client.uptime, { long: true })}\``)
				.setColor('0x4900FF')
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`);
			msg.edit(pingEmbed);
		});
	},
};