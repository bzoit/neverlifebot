const Discord = require('discord.js')
const mongo = require('../mongo');
const { db } = require('../warn-schema');
const warnSchema = require('../warn-schema')

module.exports = {
	name: 'clearwarn',
	description: 'clearwarn.',
	async execute(message, args) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            const lc = message.guild.channels.cache.get('862102954991550514');
            let user = message.mentions.members.first();
            if(!user) message.channel.send(`:x: Please mention a member.`)
            const tag = user.tag;
            let reason;
            const guildId = message.guild.id;
            const userId = user.id;
            const id = args[1];
            if(!id) message.channel.send(`:x: Please specify the ID of the warn you're trying to clear.`)
            await mongo().then(async mongoose => {
                try {
                    await warnSchema.findOneAndDelete({
                        userId,
                        guildId,
                        warnId: id
                    })
                } catch(e) {
                    return message.channel.send(':x: That warn does not exist.')
                } finally {
                    mongoose.connection.close()
                }
            })
            message.channel.send(':white_check_mark: Infraction succesfully cleared.')
            const logEmbed = new Discord.MessageEmbed()
                .setTitle('Clear Infraction')
                .addField('Moderator:',`${message.author.tag}`)
                .addField('Member:',`${tag}`)
                .addField('Cleared Warn Reason:',`${reason}`)
            lc.send(logEmbed)
        }
	},
};