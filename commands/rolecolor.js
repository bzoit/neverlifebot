const { MessageAttachment } = require("discord.js");

module.exports = {
	name: 'rolecolor',
	description: 'Allows you to change your rolecolor.',
	async execute(message, args) {
                let color;
                total = message.guild.roles.cache.size - 2;
                args.forEach(arg => {
                        if(arg.startsWith("#")) {
                                color = arg
                        }
                });
                if(!color) return message.channel.send(`:x: Please specify a valid hex code.`); 
                let role = await message.guild.roles.create({
                        data: {
                                name: color,
                                color: color,
                                position: total,
                        }
                })
                await message.member.roles.add(role.id), message.channel.send(`:white_check_mark: Succesfully gave ${message.author.tag} the color \`${color}\`.`)
	},
};