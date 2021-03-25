const mongoose = require('mongoose')
const argon2 = require('argon2')
const scheme = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true, index: true },
        password: { type: String, required: true, trim: true, minlength: 3 },
        role: { type: String, default: 'member' },
    },
    { collection: 'users' }
)

//เขียน function เพิ่ม
scheme.methods.encryptPassword = async function (password) {
    try {
        const hashPassword = await argon2.hash(password)
        return hashPassword
    } catch (err) {
        console.error(err)
    }
}

scheme.methods.checkPassword = async function (password) {
    try {
        const isValid = await argon2.verify(this.password, password)   //this.password คือ password ใน database
        return isValid
    } catch (err) {
        console.error(err)
    }
}

const user = mongoose.model('User', scheme)
module.exports = user
