const express = require('express') //  instance module express
const path = require('path') //  instance module path
const cookieParser = require('cookie-parser') //  instance module cookie-parser
const logger = require('morgan') //  instance module morgan
const { MONGODB_URL } = require('./config/index')
const passport = require('passport')

const passportJWT = require('./middleware/passportJWT')  //passby jwt
// connect mongoose
const mongoose = require('mongoose') // instance module  mongoose
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //ไว้ปิด warnning เวลาใชเคำสั่งเก่าๆ
    useCreateIndex: true,
    useFindAndModify: false, //ไม่ให้แจ้งเตือน เวลาใช้ findOneAndDelete()  findOneAndUpdate()
}) // method  mongoose ใช้ connect กับ database

const app = express()

//init passport
app.use(passport.initialize())


// ในตัวแปร express ซึ่งเป็น instance module จะมี Method ทั้งหมด 4 Method ได้แก่
// express.Router()  // สร้าง router object
app.use(logger('dev')) //log
app.use(
    express.json({
        limit: '50mb', //สามารถส่งรูปที่มีขนาดใหญ่เกิน 100kb ได้
    })
) // express.json()  // แปลงข้อมูลที่มีรูปแบบ JSON String ให้อยู่ในรูป JSON Objext
app.use(express.urlencoded({ extended: false })) // express.urlencoded() // แปลงข้อมูลจาก form ในรูปแบบ url encode เป็น Object
app.use(cookieParser()) // เราลง middleware cookieParser() เอาไว้สำหรับอ่าน header cookie ไม่อย่างนั้นมันจะหาไม่เจอและพังตลอดนั่นเอง
app.use(express.static(path.join(__dirname, 'public'))) // express.static() // เรียกใช้งาน static file เช่น ไฟล์รูปภาพ ไฟล์ js ไฟล์ css เป็นต้น



const indexRouter = require('./routes/index')
const companyRouter = require('./routes/company')
const staffRouter = require('./routes/staff')
const shopRouter = require('./routes/shop')
const userRouter = require('./routes/users')

//require middleware
const errorHandler = require('./middleware/errorHandler')

app.use('/', indexRouter)
app.use('/company', companyRouter)
app.use('/staff',[passportJWT.isLogin], staffRouter)   //[passportJWT.isLogin] ป้องกันทั้ง route เลย
app.use('/shop', shopRouter)
app.use('/users', userRouter)
app.use(errorHandler)  //ใส่บันทัดล่างก่อน รอง module.express = app  มาจาก next(error)
module.exports = app
