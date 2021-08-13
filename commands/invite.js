const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	aliases: ['inv'],
	execute(message) {
		message.channel.createInvite({ unique: true, maxAge: 0 }).then(invite => {
			const invEmbed = new Discord.MessageEmbed()
				.setTitle(`discord.gg/${invite.code}`)
				.setURL(`http://discord.com/invite/${invite.code}`)
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
				.setTimestamp()
				.setColor('0x4900FF');
			message.channel.send(invEmbed);
		});
	},
};