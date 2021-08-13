const mongo = require('../mongo')
const muteSchema = require('../mute-schema')
 
module.exports = {
	name: 'unmute',
	async execute(message, args) {
        if(message.member.hasPermission("MANAGE_ROLES")) {
            
        }
    },
};