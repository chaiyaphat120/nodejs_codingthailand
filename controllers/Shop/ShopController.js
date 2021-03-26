const Shop = require('../../Models/shop')
const Menu = require('../../Models/menu')
const saveImageToDisk = require('../../utils/upLoadImagTodisk')
// const { cloudinary } = require('../../utils/cloundinary')
const { cloudinary } = require('../../config/cloudinary')
exports.index = async (req, res, next) => {
    try {
        const shops = await Shop.find().select('name photo location').sort({ id: -1 })
        const shopWithPhotoDomain = shops.map((shop, index) => {
            return {
                id: shop._id,
                name: shop.name,
                photo: 'http://localhost:3000/images/' + shop.photo,
                location: shop.location,
            }
        })
        res.status(200).json({
            data: shopWithPhotoDomain,
        })
    } catch (error) {
        res.status(400).json({
            error,
        })
    }
}

//get menu
exports.menu = async (req, res, next) => {
    try {
        //เอา name แต่ ลบ price , ตัว shop เป็น ref จะมาอยู่แล้ว , _id ก็มาอยู่แล้ว
        //sort -id คือ sort เรียงตาม id ล่าสุด
        // Using query builder
        // const menu = await Menu.find().select(' +name ').where('price').gte(100).limit(3).sort(' -id')

        // With a JSON doc
        // const menu = await Menu.find({price: {$gte: 100}}).limit(3).sort(' -id')

        //คือ filed shop ใน schema menu  *** ตัวพิพม์เล็ก
        //Models/menu.js
        //shop: { type: Schema.Types.ObjectId, ref: "Shop" },
        //เอาแค่ name กัย location ใน model shop
        const menu = await Menu.find().populate('shop', 'name location').sort('-_id')
        res.status(200).json({
            data: menu,
        })
    } catch (error) {
        res.status(400).json({
            error,
        })
    }
}

//get shop by id แล้ว show menu ออกมา
//ร้าน อาหารไปหาเมนู จะเป็น one to many คือ 1 ร้าน อาหาร มีได้หลายเมนู  ** เมนูจะเป็น array
exports.getShopWithMenu = async (req, res, next) => {
    try {
        const { id } = req.params
        const shopWithMenu = await Shop.findById(id).populate('menus') //filed virtaul ที่เราวสร้างขึ้น
        res.status(200).json({
            data: { shopWithMenu },
        })
    } catch (error) {
        res.status(400).json({
            error,
        })
    }
}

//insert shop
exports.insert = async (req, res, next) => {
    try {
        const { name, location, photo } = req.body
        let upload_res = []
        const file = photo
        let upload_len = file.length
        if (upload_len > 0) {
            //หลายรูป
            for (let i = 0; i <= upload_len - 1; i++) {
                let filePath = file[i].imagebase64
                await cloudinary.uploader.upload(filePath, { folder: 'picture' }, (error, result) => {
                    upload_res.push({
                        asset_id: result.public_id,
                        url: result.secure_url,
                    })
                })
            }
            console.log({
                photo: upload_res,
                name,
                location,
            })
            const shop = new Shop({
                photo: upload_res,
                name,
                location,
            })
            await shop.save()
            res.status(200).json({
                status: 'upload complatye',
                data: {
                    photo: upload_res,
                    name,
                    location,
                },
            })
        }
    } catch (error) {
        res.json({
            error,
        })
    }
}
