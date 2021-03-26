const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require('../controllers/userController')
const passportJWT = require('../middleware/passportJWT') //passby jwt
router.post('/login', userController.login)
router.post(
    '/register',
    [
        //เป็น middle ware
        body('name').notEmpty().withMessage('กรุณากรอกชื่อและนามสกุลด้วย'), //body ที่field name ห้ามว่าง
        body('email').not().isEmpty().withMessage('กรุณากรอก email ด้วยนะจะ').isEmail().withMessage('รูปแบบ email บ้ถูกต้อง'), //มันจะ chain ได้
        body('password').notEmpty().withMessage('กรุณากรอกรหัสผ่าน').isLength({ min: 3 }).withMessage('รหัสผ่านต้อง 3 ตัวขึ้นไป'),
    ],
    userController.register
)

router.get('/me', [passportJWT.isLogin], userController.me)
module.exports = router
