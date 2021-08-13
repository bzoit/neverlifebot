module.exports = {
	name: 'purge',
	description: 'Purge a certain amount of messages.',
	execute(message, args) {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            if(isNaN(args[0])) return message.reply(":x: Please enter a valid number between 1 and 100");
            if(args[0] > 501) return message.channel.send(":x: Please enter a number less than 100.");
            message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`:white_check_mark: Succesfully deleted \`${messages.size}/${args[0]}\`messages.`)
            .then(msg => msg.delete({timeout: 10000})))
            .catch(error => console.log(`ERROR: ${error.message}`));
        } else message.reply(`:x: You don't have permssion to use that command.`)
	},
};