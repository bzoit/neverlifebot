const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const kickSchema = mongoose.Schema(
    {
        userId: reqString,
        guildId: reqString,
        reason: reqString,
        staffId: reqString,
    }
)

module.exports = mongoose.model('kicks', kickSchema)