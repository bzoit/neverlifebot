const mongoose = require('mongoose')

const warnSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    staffId: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    warnId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('warnings', warnSchema)