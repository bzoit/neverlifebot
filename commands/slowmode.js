module.exports = {
	name: 'slowmode',
	description: 'Changes the slowmode of a channel.',
	async execute(message, args) {
        if(message.member.hasPermission("MANAGE_CHANNELS")) {
            if(!args[0]) return message.channel.send(`:x: Please specify a time in seconds.`);
            if(isNaN(args[0]))return message.channel.send(`:x: Please specify a valid number.`);
            message.channel.setRateLimitPerUser(args[0]);
            message.channel.send(`:white_check_mark: Succesfully changed the slowmode in #${message.channel.name}.`)
        }
	},
};