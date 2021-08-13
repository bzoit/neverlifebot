const Discord = require('discord.js');

module.exports = {
	name: 'giverole',
	description: 'Gives a member the role stated.',
	async execute(message, args) {
        if(message.member.hasPermission("MANAGE_ROLES")) {
            const user = message.mentions.members.first();
            if(!user) return message.channel.send(`:x: Please mention a user.`);
            const role = message.mentions.roles.first()
            if(!role) return message.channel.send(`:x: Please specify a role.`);
            await user.roles.add(role.id), message.channel.send(`:check: Succesfully gave **${user}** the role.`)
        }
	},
};