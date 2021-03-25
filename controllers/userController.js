const User = require('../Models/user')

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body
    const user = new User()
    user.name = name
    user.password = password
    user.email = email

    await user.save()
    res.status(200).json({ 
        message: 'ลงเทียบเรียบร้อย!' 
    })
}

exports.login = async (req, res, next) => {
    res.status(200).json({ message: 'helloworld' })
}
