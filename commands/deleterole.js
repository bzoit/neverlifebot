const Discord = require('discord.js');

module.exports = {
	name: 'deleterole',
	aliases: ['delrole'],
	async execute(message) {
		if(message.member.hasPermission("MANAGE_ROLES")) {
            const role = message.mentions.roles.first()
			const roleName = role.name;
            if (!role) message.channel.send(':x: Please specify a valid role.')
            role.delete().then(deleted => message.channel.send(`:white_check_mark: Succesfully deleted ${deleted.name}`)).catch(console.error)
			const lc = message.guild.channels.cache.get('862102954991550514');
            const logEmbed = new Discord.MessageEmbed()
                .setTitle('Role Delete')
                .addField('Moderator:',`${message.author.tag}`)
                .addField('Role:',`${roleName}`)
            lc.send(logEmbed)
		}
	},
};