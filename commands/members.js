const Discord = require('discord.js');

module.exports = {
	name: 'members',
	aliases: ['membercount', 'users'],
	execute(message) {
		const members = message.guild.members.cache;

		const membersEmbed = new Discord.MessageEmbed()
			.setAuthor('Members', `${message.guild.iconURL({ dynamic: true })}`)
			.addField(`:busts_in_silhouette: All Members`, `${message.guild.memberCount}`, true)
			.addField(`:adult: Humans`, `${members.filter(member => !member.user.bot).size}`, true)
			.addField(`:robot: Bots`, `${members.filter(member => member.user.bot).size}`, true)
			.addField(`:green_circle: Online`, `${members.filter(member => member.user.presence.status === 'online').size}`, true)
			.addField(`:crescent_moon: Do Not Disturb`, `${members.filter(member => member.user.presence.status === 'dnd').size}`, true)
			.addField(`:orange_circle: Idle`, `${members.filter(member => member.user.presence.status === 'idle').size}`, true)
			.addField(`:mobile_phone_off: Offline`, `${members.filter(member => member.user.presence.status === 'offline').size}`, true)
			.setColor('0x4900FF');
		message.channel.send(membersEmbed);
	},
};