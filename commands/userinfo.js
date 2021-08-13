const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'userinfo',
	aliases: ['uinfo', 'memberinfo', 'info', 'whois'],
	async execute(message, args) {
		const xEmoji = ':x:';
		const onlineEmoji = ':green_circle:';
		const dndEmoji = ':crescent_moon:';
		const idleEmoji = ':orange_circle:';
		const offlineEmoji = ':mobile_phone_off:';

		const statuses = {
			dnd: `${dndEmoji} Do not Disturb`,
			online: `${onlineEmoji} Online`,
			idle: `${idleEmoji} Idle`,
			offline: `${offlineEmoji} Offline`,
		};

		if(args[0]) {
			const user = message.mentions.users.first();
			const member = message.mentions.members.first();
			const roles = member.roles.cache;

			if(!member) return message.reply(`${xEmoji} Please mention a user.`);

			const infoEmbed = new Discord.MessageEmbed()
				.setAuthor(`${user.tag}`, `${user.displayAvatarURL()}`)
				.setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
				.setColor('0x4900FF')
				.addField(`Account Created`, `${moment(user.createdTimestamp).format('MMMM Do, YYYY [at] h:mm A')}`, true)
				.addField('Tag', `${user.tag}`, true)
				.addField('Username', `${user.username}`, true)
				.addField('ID', `${user.id}`, true)
				.addField('Joined Server', `${moment(member.joinedTimestamp).format('MMMM Do, YYYY [at] h:mm A')}`, true)
				.addField('Status', `${statuses[user.presence.status]}`, true)
				.addField('Roles', `${roles.array().join(' ')}`, true)
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`, true);
			return message.channel.send(infoEmbed).catch(err => console.log(err));
		}
		else {return message.channel.send(`${xEmoji} Please mention a user.`);}
	},
};