module.exports = {
	name: 'say',
	aliases: ['repeat', 'echo'],
	execute(message, args) {
		if(args[0]) {
			if(message.member.hasPermission("MANAGE_MESSAGES")) {
				const sayMessage = args.join(" ");
				message.delete().catch(err => console.log(err));
				message.channel.send(sayMessage);
			}
			else {message.channel.send(`:x: You don't have permission to use that command.`);}
		}
		else {return message.channel.send(`:x: Please state something for me to say.`);}
	},
};