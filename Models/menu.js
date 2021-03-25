const mongoose = require("mongoose")
const Schema = mongoose.Schema
const scheme = Schema(
    {
        name: String,
        price: Number,
        shop: { type: Schema.Types.ObjectId, ref: "Shop" }, //เอา id ของ shop มา  //Modelตัวนี้คือตีว พิมม์ใหญ่ const shop = mongoose.model("Shop", scheme)
    },
    //toJSON: { virtuals: true } เปิดให้รับ filed แบบ virtaul ได้
    { collation: "menus", timestamps: true, toJSON: { virtuals: true } }
)

const menu = mongoose.model("Menu", scheme)
module.exports = menu

//สร้าง vurtaul filed ข้อดีคือไม่ต้องบันทึกลง monngodb จริง 
//virtaul filed แบบ getter
scheme.virtual("price_vat").get(function () {
    return this.price * 0.07 + this.price
})

//many to one
