const Discord = require('discord.js');

module.exports = {
	name: 'moderators',
	aliases: ['mods', 'staff', 'admins', 'administrators'],
	execute(message) {
		const members = message.guild.members.cache;
		const modsEmbed = new Discord.MessageEmbed()
			.setColor('0x4900FF')
			.addField('Administrators', `${members.filter(member => member.hasPermission("ADMINISTRATOR")).array().join(" ")}`)
			.addField('Bots', `${members.filter(member => member.user.bot).array().join(" ")}`);
		return message.channel.send(modsEmbed);
	},
};