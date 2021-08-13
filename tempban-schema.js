const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const tempbanSchema = mongoose.Schema(
    {
        userId: reqString,
        guildId: reqString,
        reason: reqString,
        staffId: reqString,
        expiration: {
            type: Date,
            required:true
        },
        current: {
            type: Boolean,
            required: true
        }
    }, {
        timestamps: true
    }
)

module.exports = mongoose.model('tempban', tempbanSchema)