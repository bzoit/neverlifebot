const Discord = require('discord.js');
const mongo = require('../mongo');
const banSchema = require('../ban-schema')

module.exports = {
	name: 'ban',
	async execute(message, args) {
        if(message.member.hasPermission("BAN_MEMBERS")) {
            const lc = message.guild.channels.cache.get('862102954991550514');
            let user = message.mentions.members.first();
            if(!user) message.channel.send(`:x: Please mention a member.`)
            let reason = args.slice(1).join(" ")
            if(!reason) message.channel.send(':x: Please specify a reason.')
            let tag = user.user.tag;
            await user.send(`You have been banned from ${message.guild.name} for the reason: ${reason}.`);
            await user.ban({
                reason: reason
            });
            message.channel.send(`:white_check_mark: Member succesfully banned.`)
            const logEmbed = new Discord.MessageEmbed()
                .setTitle('Ban')
                .addField('Moderator:',`${message.author.tag}`)
                .addField('Banned Member:',`${tag}`)
                .addField('Reason:',`${reason}`)
            lc.send(logEmbed)
            await mongo().then(async mongoose => {
                try {
                    await new banSchema({
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