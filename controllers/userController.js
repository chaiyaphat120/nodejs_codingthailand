const User = require('../Models/user')
const { validationResult } = require('express-validator')
var jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/index')
//validationResult ไว้รับ error จากไฟล์ router / user
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        //validation
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = new Error('ข้อมูลที่รับมาไม่ถูกต้อง') //err.message
            error.statusCode = 422 //คือข้อมูลที่รับมาไม่ถูกต้อง
            error.validation = errors.array() //โยนค่า error มา ที่เกิดจาก route user
            throw error
        }

        //check email ซ้ำ
        const existEmail = await User.findOne({ email })
        if (existEmail) {
            const error = new Error('Email ซ้ำ ลองใหม่อีกครั้ง') //err.message
            error.statusCode = 400
            throw error
        }

        const user = new User()
        user.name = name
        user.password = await user.encryptPassword(password) //ใช้ function เขียนใน schema เลย
        user.email = email

        await user.save()
        res.status(200).json({
            message: 'ลงเทียบเรียบร้อย!',
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        //check ว่า มี email นี้หรือไม่
        const user = await User.findOne({ email })
        if (!user) {
            const error = new Error('ไม่พบผู้ใช้งานในระบบ') //err.message
            error.statusCode = 400
            throw error
        }

        //ตรวจสอบรหัสผ่านว่าตรงหรือบ้  ไม่ตรง(false) ให้ยืนค่า error ออกไป
        const isValid = await user.checkPassword(password)
        if (!isValid) {
            const error = new Error('รหัสผ่านไม่ถูกต้อง') //err.message
            error.statusCode = 401
            throw error
        }
        //สร้าง token //check แค่ verify ผ่าน
        console.log( { id: user._id, role: user.role })
        const payload = { id: user._id, role: user.role }
        //https://www.grc.com/passwords.htm  ไว้ gen secrete
        const token = await jwt.sign( { id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '2 min' })
        console.log("2")
        //decode วันหมดอายุ
        const expires_in = jwt.decode(token)

        res.status(200).json({
            access_token: token,
            expires_in: expires_in.exp,
            token_type: "Bearer"
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
