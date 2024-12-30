const mongoose = require('mongoose')

const fileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    originalName: {
        type: String
    },
    path: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const fileModel = mongoose.model('file', fileSchema)

module.exports = fileModel