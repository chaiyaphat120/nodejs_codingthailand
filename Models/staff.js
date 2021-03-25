const mongoose = require("mongoose")

const scheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, //ต้องการ filed นี้ หาก ไม่กรอกจะ error
            trim: true, //ตัดช่องว่างซ้าย-ขวา
            unique: true, //ห้ามซ้ำ
        },
        salary: String,
        tel:String,
        created: {
            type: Date, //ใส่วันที่
            default: Date.now, //ใส่ Defualt คือ เราไม่ต้องกรอกเอง มันจะdefualt ให้ โดยเอาวันที่ปัจจุบันขณะ ทำการ ยิง api กรอกให้
        },
    },
    { collection: "staffs" }
)

const staff = mongoose.model("Staff", scheme)
module.exports = staff



