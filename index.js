const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');
// eslint-disable-next-line no-unused-vars
const ms = require('ms');
const fs = require('fs');
const mongo = require('./mongo')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}
client.once('ready', async () => {
	console.log(`Logged in as ${client.user.tag}.`);
	client.user.setActivity('!help | Neverlife Studios', { type: "STREAMING", url: 'https://www.twitch.tv/discord' })
		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error);
	await mongo().then(mongoose => {
		console.log('Connected to MongoDB');
	})
});

client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.log(error);
		message.channel.send(`:x: Whoops! Looks like there is an error with that command. Use the \`${prefix}ticket\` command to report a bug.`);
	}
});

const muteSchema = require('./mute-schema');
const tempbanSchema = require('./tempban-schema');

client.on('guildMemberAdd', async (member) => {
	const { guild } = member;
	const channel = guild.channels.cache.get('862102892814794772')
	const welcomeEmbed = new Discord.MessageEmbed()
		.setImage(`${member.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
	channel.send(`**:wave: Welcome to ${guild.name}, <@${member.id}>!**`)
	channel.send(welcomeEmbed)
	let previousMutes = await muteSchema.find({
		userId: member.id,
		guildId: guild.id
  	});

  	if (!previousMutes) {
		return console.log('Not muted');
  	} else {
	  const currentlyMuted = previousMutes.filter(mute => {
		  return mute.current === true
	  })
	  if(currentlyMuted.length > 0) {
		member.roles.add('862311707703246878');
	  }
  	}
})

client.on('guildMemberRemove', async (member) => {
	const { guild } = member;
	const channel = guild.channels.cache.get('862102892814794772')
	const welcomeEmbed = new Discord.MessageEmbed()
		.setImage(`${member.user.displayAvatarURL({ size: 4096, dynamic: true })}`)
	channel.send(`:wave: **Sad to see you go ${member.user.tag}.**`)
	channel.send(welcomeEmbed)
})

client.login(token);


// Mute and Ban Expiration Bug Thing:
const checkMutes = async () => {
	console.log('Running')
	const now = new Date()
	const conditional = {
		expires: {
			$lt: now
		},
		current: true
	}
	const results = await muteSchema.find(conditional)
	console.log('Passed Mongo')
	if (results && results.length) {
		for (const result of results) {
			const { guildId, userId } = result
			const guild = client.guilds.cache.get(guildId)
			const member = (await guild.members.fetch()).getHours(userId)
			const muteRole = guild.roles.cache.get('862311707703246878')
			member.roles.remove(muteRole)
		}
		await muteSchema.updateMany(conditional , {
			current: false
		})
		console.log('Passed update')
	}
	setTimeout(checkMutes, 1000 * 60)
}
checkMutes()

const checkBans = async () => {
	console.log('Running')
	const now = new Date()
	const conditional = {
		expires: {
			$lt: now
		},
		current: true
	}
	const results = await tempbanSchema.find(conditional)
	console.log('Passed Mongo')
	if (results && results.length) {
		for (const result of results) {
			const { guildId, userId } = result
			const guild = client.guilds.cache.get(guildId)
            guild.fetchBans().then(async bans => {
                let bUser = bans.find(b => b.user.id == userId);
                await guild.members.unban(bUser.user.id)
            })
		}
		await tempbanSchema.updateMany(conditional , {
			current: false
		})
		console.log('Passed update')
	}
	setTimeout(checkBans, 1000 * 60)
}
checkBans()