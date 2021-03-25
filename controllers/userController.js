const User = require("../Models/user")

exports.register = async (req, res, next) => {
    res.status(200).json({message: 'hello register'})
}

exports.login = async (req, res, next) => {
    res.status(200).json({message: 'helloworld'})
}


