const Discord = require('discord.js');

module.exports = {
	name: 'avatar',
	aliases: ['av', 'pfp', 'icon'],
	execute(message, args) {
		if(args[0]) {
			const user = message.mentions.users.first();
			if(!user) return message.reply(`:x: Please mention a user.`);

			const otherIconEmbed = new Discord.MessageEmbed()
				.setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
				.setColor('0x4900FF')
				.setAuthor(`${user.tag}`, `${user.displayAvatarURL()}`);
			return message.channel.send(otherIconEmbed).catch(err => console.log(err));
		}

		const myIconEmbed = new Discord.MessageEmbed()
			.setImage(`${message.author.displayAvatarURL({ size: 4096, dynamic: true })}`)
			.setColor('0x4900FF')
			.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);
		return message.channel.send(myIconEmbed).catch(err => console.log(err));
	},
};