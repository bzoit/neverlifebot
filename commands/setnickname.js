module.exports = {
	name: 'setnickname',
	description: "Change a user's nickname.",
	execute(message, args) {
        if(message.member.hasPermission("MANAGE_NICKNAMES")) {
            const member = message.mentions.members.first()
            if(!member) {
                const argument = args.slice(0).join(" ")
                if(!argument) return message.channel.send(`:x: Please specify a nickname.`)
                message.member.setNickname(argument), message.channel.send(`:white_check_mark: Succesfully changed ${message.author.tag}'s nickname.`)
            } else {
                const argument = args.slice(1).join(" ")
                if(!argument) return message.channel.send(`:x: Please specify a nickname.`)
                member.setNickname(argument), message.channel.send(`:white_check_mark: Succesfully changed ${member}'s nickname.`)
            }
        }
	},
};