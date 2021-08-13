const Discord = require('discord.js');
const moment = require('moment');

module.exports = {
	name: 'serverinfo',
	aliases: ['discordinfo', 'guildinfo'],
	async execute(message) {
		const regions = {
			brazil: 'Brazil',
			europe: 'Europe',
			hongkong: 'Hong Kong',
			india: 'India',
			japan: 'Japan',
			russia: 'Russia',
			singapore: 'Singapore',
			southafrica: 'South Africa',
			sydney: 'Sydney',
			'us-central': 'US Central',
			'us-east': 'US East',
			'us-west': 'US West',
			'us-south': 'US South',
		};
		const verificationLevels = {
			NONE: 'None',
			LOW: 'Low',
			MEDIUM: 'Medium',
			HIGH: 'High',
			VERY_HIGH: 'Very High',
		};
		const emojis = message.guild.emojis.cache;
		const members = message.guild.members.cache;
		const roles = message.guild.roles.cache;
		const channels = message.guild.channels.cache;

		const sInfoEmbed = new Discord.MessageEmbed()
			.setTitle(`${message.guild.name}`)
			.setThumbnail(`${message.guild.iconURL({ dynamic: true })}`)
			.setColor('0x4900FF')
			.addField('Region', `${regions[message.guild.region]}`, true)
			.addField('Owner', `${message.guild.owner.user.tag}`, true)
			.addField(`Emotes`, `${emojis.size} Emotes`, true)
			.addField('Roles', `${roles.size - 1} Roles`, true)
			.addField('Boosters', `${message.guild.premiumSubscriptionCount} Boosters`, true)
			.addField(`Created`, `${moment(message.guild.createdTimestamp).format('MMMM Do, YYYY [at] h:mm A')}`, true)
			.addField('Verification Level', `${verificationLevels[message.guild.verificationLevel]}`, true)
			.addField('Server ID', `${message.guild.id}`)
			.addField('Members', `\n All Members: ${message.guild.memberCount} \n Humans: ${members.filter(member => !member.user.bot).size} \n Bots: ${members.filter(member => member.user.bot).size}`, true)
			.addField('Channels', `\n Text Channels: ${channels.filter(channel => channel.type === 'text').size} \n Voice Channels: ${channels.filter(channel => channel.type === 'voice').size} \n Categories: ${channels.filter(channel => channel.type === 'category').size}`, true)
			.setFooter(`Requested by ${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`, true);
		return message.channel.send(sInfoEmbed);
	},
};