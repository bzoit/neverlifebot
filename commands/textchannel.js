// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
	name: 'textchannel',
	aliases: ['typechannel', 'createtext', 'addtext', 'newtext', 'text', 'tc'],
	async execute(message) {
		// eslint-disable-next-line no-unused-vars
		if(message.member.hasPermission("MANAGE_CHANNELS")) {
			message.channel.send('What would you like to name the channel?');
			const filter = m => m.author.id === message.author.id;
			await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
				.then(m => message.guild.channels.create(`${m.first().content}`, { type: 'text' })
				// eslint-disable-next-line indent
				.then(message.channel.send(`:white_check_mark: Channel succesfully created.`)))
				// eslint-disable-next-line indent
				.catch((e) => {
					console.log(e);
					message.channel.send(`:x: Prompt timed out.`);
				});
		}
	},
};