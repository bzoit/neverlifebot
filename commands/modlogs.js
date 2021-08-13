const Discord = require('discord.js');
const banSchema = require('../ban-schema');
const kickSchema = require('../kick-schema');
const warnSchema = require('../warn-schema');
const muteSchema = require('../mute-schema');

module.exports = {
	name: 'modlogs',
	async execute(message, args) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            const user = message.mentions.members.first();
            if(!user) return message.channel.send(':x: Please mention a member.');
            const bans = await banSchema.find({
                userId: user.id,
                guildId: message.guild.id
            });
            const kicks = await kickSchema.find({
                userId: user.id,
                guildId: message.guild.id
            });
            const mutes = await muteSchema.find({
                userId: user.id,
                guildId: message.guild.id
            });
            const warns = await warnSchema.find({
                userId: user.id,
                guildId: message.guild.id
            });

            let warnList = [];
            let banList = [];
            let kickList = [];
            let muteList = [];

            bans.forEach(bansPush)        
            function bansPush(value, index, array) {
                banList.push(`Moderator: ${value.staffId}\nReason: ${value.reason}\n`);
            }
            warns.forEach(warnsPush)        
            function warnsPush(value, index, array) {
                warnList.push(`Moderator: ${value.author}\nReason: ${value.reason}\nWarn ID: ${value.warnId}\n`);
            }
            kicks.forEach(kicksPush)        
            function kicksPush(value, index, array) {
                kickList.push(`Moderator: ${value.staffId}\nReason: ${value.reason}\n`);
            }            
            mutes.forEach(mutesPush)        
            function mutesPush(value, index, array) {
                kickList.push(`Moderator: ${value.staffId}\nReason: ${value.reason}\n`);
            }
            if(warnList.length === 0) {
                warnList = 'None\n';
            }
            if(banList.length === 0) {
                banList = 'None\n';
            }
            if(kickList.length === 0) {
                kickList = 'None\n';
            }
            if(muteList.length === 0) {
                muteList = 'None\n';
            }
            const modlogsEmbed = new Discord.MessageEmbed()
                .setTitle(`<@${user.id}>'s Moderation Logs`)
                .addField('Warns', warnList)
                .addField('Bans', banList)
                .addField('Kicks', kickList)
                .addField('Mutes', muteList)
            message.channel.send(modlogsEmbed)
        }
	},
};