const Discord = require('discord.js');

module.exports = {
	name: 'deletechannel',
	aliases: ['delchannel'],
	async execute(message) {
		if(message.member.hasPermission("MANAGE_CHANNELS")) {
            const channel = message.mentions.channels.first()
            if (!channel) message.channel.send(':x: Please specify a valid channel.')
			const channelName = channel.name;
            channel.delete().then(deleted => message.channel.send(`:white_check_mark: Succesfully deleted ${deleted.name}`)).catch(console.error)
			const lc = message.guild.channels.cache.get('862102954991550514');
            const logEmbed = new Discord.MessageEmbed()
                .setTitle('Channel Delete')
                .addField('Moderator:',`${message.author.tag}`)
                .addField('Channel:',`${channelName}`)
            lc.send(logEmbed)
		}
	},
};