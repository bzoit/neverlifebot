const Discord = require('discord.js');

module.exports = {
	name: 'removerole',
	description: 'Removes a role from the member stated.',
	async execute(message, args) {
        if(message.member.hasPermission("MANAGE_ROLES")) {
            const user = message.mentions.members.first();
            if(!user) return message.channel.send(`:x: Please mention a user.`);
            const role = message.mentions.roles.first();
            if(!role) return message.channel.send(`:x: Please specify a role.`);
            await user.roles.remove(role.id), message.channel.send(`:white_check_mark: Succesfully removed **${user}**'s role.`)
        }
	},
};