const mongoose = require('mongoose')

const scheme = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true, index: true },
        password: { type: String, required: true, trim: true, minlength: 3 },
        role: { type: String, default: 'member' },
    },

    { collection: 'users' }
)

const user = mongoose.model('User', scheme)
module.exports = user
