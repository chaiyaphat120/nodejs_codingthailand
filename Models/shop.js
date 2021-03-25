const mongoose = require('mongoose')
const scheme = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        photo: { type: String, default: 'nopic.png' },
        location: {
            lat: Number,
            lgn: Number,
        },
        photo: [{ asset_id: String, url: String }],
        //ถ้าอยากได้ 2 column นี้ อัตโนมัติให้ใส่คำว่า  timestamps
        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
    },
    { collection: 'shops', timestamps: true, toJSON: { virtuals: true } }
)
scheme.virtual('menus', {
    ref: 'Menu', //link ไปที่ Model menu
    localField: '_id', //id คือ filed ของ model shop (ไฟล์นี้)
    foreignField: 'shop', //shop คือ  filed shop ของ model menu (fk)
})
const shop = mongoose.model('Shop', scheme)
module.exports = shop
