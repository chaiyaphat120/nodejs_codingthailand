// connect mongoose
const mongoose = require('mongoose') // instance module  mongoose
const { MONGODB_URL } = require('./index')
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //ไว้ปิด warnning เวลาใชเคำสั่งเก่าๆ
    useCreateIndex: true,
    useFindAndModify: false, //ไม่ให้แจ้งเตือน เวลาใช้ findOneAndDelete()  findOneAndUpdate()
}) // method  mongoose ใช้ connect กับ database

module.exports = {mongoose}