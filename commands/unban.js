const Discord = require('discord.js');
const ms = require('ms');

module.exports = {
	name: 'unban',
	async execute(message, args) {
        if(message.member.hasPermission("BAN_MEMBERS")) {
            const lc = message.guild.channels.cache.get('860087649205616655');
            let user = args[0];
            if(!user) message.channel.send(`:x: Please specify a user's ID.`)
            message.guild.fetchBans().then(async bans => {
                let bUser = bans.find(b => b.user.id == user);
                if (!bUser) return message.channel.send(`:x: The user ID stated is either invalid or the user isn't banned.`)
                await message.guild.members.unban(bUser.user)
            })
            message.channel.send(`:white_check_mark: Member succesfully unbanned.`)
            const logEmbed = new Discord.MessageEmbed()
                .setTitle('Unban')
                .addField('Moderator:',`${message.author.tag}`)
                .addField('Unbanned Member:',`${user}`)
            lc.send(logEmbed)
        }
	},
};