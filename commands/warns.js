const Discord = require('discord.js')
const mongo = require('../mongo')
const warnSchema = require('../warn-schema')

module.exports = {
	name: 'warns',
	description: 'Warns.',
	async execute(message, args) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            let user = message.mentions.members.first();
            if(!user) message.channel.send(`:x: Please mention a member.`)
            const guildId = message.guild.id;
            const userId = user.id;

            await mongo().then(async mongoose => {
                try {
                    const results = await warnSchema.findOne({
                        guildId,
                        userId
                    })

                    let reply = `<@${userId}>'s Warnings:\n\n`
                    let i = 1;
                    for (const warning of results.warnings) {
                        const { author, timestamp, reason, warnId} = warning;
                        reply += `Warning ${i}: \n  Moderator: ${author}\n  Date: ${new Date(timestamp).toLocaleDateString()}\n  ID: ${warnId}\n  Reason: "${reason}"\n\n`;
                        i += 1;
                    }
                    message.channel.send(reply)
                } catch(e) {
                    message.channel.send(`:x: That user doesn't have any warns.`)
                } finally {
                    mongoose.connection.close()
                }
            })
        }
	},
};