const Discord = require('discord.js');
const mongo = require('../mongo');
const kickSchema = require('../kick-schema');

module.exports = {
	name: 'kick',
	async execute(message, args) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            const lc = message.guild.channels.cache.get('862102954991550514');
            let user = message.mentions.members.first();
            if(!user) message.channel.send(`:x: Please mention a member.`)
            let reason = args.slice(1).join(" ")
            if(!reason) message.channel.send(':x: Please specify a reason.')
            let tag = user.user.tag;
            await user.send(`You have been kicked from ${message.guild.name} for the reason: ${reason}.`);
            await user.kick({
                reason: reason
            });
            message.channel.send(`:white_check_mark: Member succesfully kicked.`)
            const logEmbed = new Discord.MessageEmbed()
                .setTitle('Kick')
                .addField('Moderator:',`${message.author.tag}`)
                .addField('Kicked Member:',`${tag}`)
                .addField('Reason:',`${reason}`)
            lc.send(logEmbed)
            await mongo().then(async mongoose => {
                try {
                    await new kickSchema({
                        userId: user.id,
                        guildId: message.guild.id,
                        reason,
                        staffId: message.author.id
                    }).save()
                } finally {
                    mongoose.connection.close()
                }
            })
        }
	},
};