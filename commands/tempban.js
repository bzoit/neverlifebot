const mongo = require('../mongo')
const tempbanSchema = require('../tempban-schema')
 
module.exports = {
	name: 'tempban',
	description: 'Ban a member temp E.',
	async execute(message, args) {
        if(message.member.hasPermission("BAN_MEMBERS")) {
            const user = message.mentions.members.first();
            if(!user);
            let reason = args[1]
            if(!reason) return message.channel.send(':x: Correct Syntax: `!tempban @Example <Reason> <Duration>`.')
            let duration = args[2];
            if(!duration) return message.channel.send(':x: Correct Syntax: `!tempban @Example <Reason> <Duration>`.');
            let expiration = new Date();
 
            let previousBans = await tempbanSchema.find({
                  userId: user.id,
                  guildId: message.guild.id
            });

            if (!previousBans) {
               console.log('Continue');
            }  else {
                const currentlyBanned = previousBans.filter(mute => {
                    return tempban.current === true
                })
                if(currentlyBanned.length > 0) {
                    return message.channel.send(':x: That user is already banned.')
                }
            }

            if(duration.endsWith("m")) {
                duration.slice(duration.length, duration.length)
                const num = isNaN(duration)
                if (num === false) {
                    expiration.getMinutes() + duration;
                }
            } else if (duration.endsWith("h")) {
                duration.slice(duration.length, duration.length)
                const num = isNaN(duration)
                if (num === false) {
                    expiration.getHours() + duration;
                }
            } else {
                return message.channel.send(':x: The duration must end with `m` or `h`.')
            }
            try {
                await user.send(`You have been temporarily banned from ${message.guild.name} for the reason: ${reason}. You will be unmuted in ${duration}.`);
            } catch(e) {
                message.channel.send(`:x: I was unable to send the ban message to the mentioned user.`)
            }
            user.roles.add('862311707703246878');
            message.channel.send(`:white_check_mark: Succesfully banned **${user.user.tag}**.`);
 
            await mongo().then(async mongoose => {
                try {
                    await new tempbanSchema({
                        userId: user.id,
                        guildId: message.guild.id,
                        reason,
                        staffId: message.author.id,
                        expiration,
                        current: true
                    }).save()
                } finally {
                    mongoose.connection.close()
                }
            })
            const lc = message.guild.channels.cache.get('862102954991550514');
            const logEmbed = new Discord.MessageEmbed()
                .setTitle('Temp Ban')
                .addField('Moderator:',`${message.author.tag}`)
                .addField('Banned Member:',`${user.user.tag}`)
                .addField('Reason:',`${reason}`)
            lc.send(logEmbed)
        }
    },
};