const Staff = require("../Models/staff")

exports.putV1 = async (req, res, next) => {
    //find => update   //ข้อเสียคือ ถ้าเป็นข้อมูลเดิม มันก็ยังอัพเดต
    try {
        const { salary, name, id ,tel } = req.body
        console.log(id, name, salary)
        const staff = await Staff.findById(id)
        if (!staff) {
            //check ว่ามี user มั้ย ถ้าไม่มีให้ ส่ง errorไป
            throw new Error("update fail ไม่พบ user ที่ต้องการอัพเดต")
        }
        console.log(staff)
        staff.name = name
        staff.salary = salary
        staff.tel = tel
        await staff.save()

        res.status(200).json({
            message: "edit complete",
        })
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                msg: "User not found",
            })
        }
        res.status(400).json({
            error: {
                mesaage: "เกิดข้อผิดพลาด " + error.message,
            },
        })
    }
}


exports.putV2 = async (req, res, next) => {
    //ข้อเสียคือ ถ้าเป็นข้อมูลเดิม มันก็ยังอัพเดต
    try {
        const { salary, name, id ,tel } = req.body
        const staff = await Staff.findByIdAndUpdate(id ,{
            name,
            salary,
            tel
        })
        console.log(staff)
        if (!staff) {
            //check ว่ามี user มั้ย ถ้าไม่มีให้ ส่ง errorไป
            throw new Error("update fail ไม่พบ user ที่ต้องการอัพเดต")
        }
        res.status(200).json({
            message: "edit complete",
        })
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                msg: "User not found",
            })
        }
        res.status(400).json({
            error: {
                mesaage: "เกิดข้อผิดพลาด " + error.message,
            },
        })
    }
}

exports.putV3 = async (req, res, next) => {
    try {
        const { salary, name, id ,tel } = req.body
        const staff = await Staff.updateOne({_id:id }, {
            name,
            salary,
            tel
        })
        console.log(staff)
        if(staff.n === 0){
            throw new Error("ไม่พบ user ที่ต้องการอัพเดต")
        }
        if (staff.nModified === 0) {
            throw new Error("กรุณาใส่ข้อมูลที่ต้องการอัพเดต เพราะยังเป็นข้อมูลเดิม")
        }
        res.status(200).json({
            message: "edit complete",
        })
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                msg: "User not found",
            })
        }
        res.status(400).json({
            error: {
                mesaage: "เกิดข้อผิดพลาด " + error.message,
            },
        })
    }
}

