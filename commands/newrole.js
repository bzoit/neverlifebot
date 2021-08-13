const Discord = require('discord.js');

module.exports = {
	name: 'newrole',
	aliases: ['addrole', 'createrole'],
	async execute(message) {
		if(message.member.hasPermission("MANAGE_ROLES")) {
			message.channel.send('What would you like to name the role?');
			const filter = m => m.author.id === message.author.id;
			await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(m => message.guild.roles.create({ data: { name: `${m.first().content}` } })
				// eslint-disable-next-line indent
				.then(message.channel.send(`:white_check_mark: Role succesfully created.`)))
				// eslint-disable-next-line indent
				.catch((e) => {
					console.log(e);
					message.channel.send(`:x: Prompt timed out.`);
				});
		}
	},
};