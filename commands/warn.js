const Discord = require('discord.js')
const mongo = require('../mongo')
const warnSchema = require('../warn-schema')

module.exports = {
	name: 'warn',
	description: 'Warn.',
	async execute(message, args) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            const lc = message.guild.channels.cache.get('862102954991550514');
            let user = message.mentions.members.first();
            if(!user) message.channel.send(`:x: Please mention a member.`)
            let reason = args.slice(1).join(" ")
            if(!reason) message.channel.send(':x: Please specify a reason.')
            let tag = user.user.tag;
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            const length = 20;
            let warnId = "";
            for (let i = 0; i < length; i++) {
                const randomNum = Math.floor(Math.random() * characters.length);
                warnId += characters[randomNum];
            }
            const guildId = message.guild.id;
            const userId = user.id;
            try {
                await user.send(`You have been warned in ${message.guild.name} for the reason: ${reason}.`);
            } catch(e) {
                message.channel.send(`:x: I was unable to send the warn message to the mentioned user.`)
            }
            message.channel.send(`:white_check_mark: Member succesfully warned.`)
            const logEmbed = new Discord.MessageEmbed()
                .setTitle('Warn')
                .addField('Moderator:',`${message.author.tag}`)
                .addField('Warned Member:',`${tag}`)
                .addField('Warn ID:', `${warnId}`)
                .addField('Reason:',`${reason}`)
            lc.send(logEmbed)

            await mongo().then(async mongoose => {
                try {
                    await new warnSchema({
                        guildId,
                        userId,
                        staffId: message.author.id,
                        reason,
                        warnId
                    }).save()
                } finally {
                    mongoose.connection.close()
                }
            })
        }
	},
};