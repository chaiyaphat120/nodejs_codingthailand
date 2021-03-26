const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')

const { JWT_SECRET } = require('../config/index')
const User = require('../Models/user')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken() //fontend ส่งมา
//ส่งมาที่Headers Authorization  Bearer eyJhbGciO....
//option
opts.secretOrKey = JWT_SECRET

//# ถ้าใส่ ก็ใช้แต่เราไม่ได้ใส่ payload เพิ่ม
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'
passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        //done จะเหมือน next
        try {
            const user = await User.findById(jwt_payload.id)
            if (!user) {
                return done(new Error('ไม่พบผู้ใช้ระบบ'), null)
            }
            return done(null, user) //ไม่มี error เพราะnull  //สามารถดูข้อมูลที่ req ได้ แนบไปกับ req
        } catch (error) {
            done(error) //เข้า handler error
        }
    })
)

module.exports.isLogin = passport.authenticate('jwt', { session: false })
