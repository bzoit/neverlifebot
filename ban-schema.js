const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const banSchema = mongoose.Schema(
    {
        userId: reqString,
        guildId: reqString,
        reason: reqString,
        staffId: reqString,
    }
)

module.exports = mongoose.model('bans', banSchema)