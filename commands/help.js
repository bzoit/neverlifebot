const Discord = require('discord.js')

module.exports = {
	name: 'help',
	description: 'An embed with a list of all bot commands.',
	execute(message, args) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor(0x00e1ff)
            .setTitle("Help")
            .setDescription("The following is a list of all bot commands organized into their appropriate categories.")
            .addField('Moderation', '`ban`, `unban`, `warn`, `clearwarn`, `kick`, `modlogs`, `mute`, `unmute`, `tempban`, `slowmode`')
            .addField('Roles', '`giverole`, `removerole`')
            .addField('Utility', '`avatar`, `nickname`, `whois`, `help`, `serverinfo`, `ping`, `rolecolor`, `purge`, `newrole`, `deleterole`, `textchannel`, `deletechannel`, `voicechannel`')
            .addField('Other', '`ticket`')
        message.author.send(helpEmbed);
        message.reply("Make sure your DM's are on so I can message you a list of the commands in your direct messages inbox.")
	},
};