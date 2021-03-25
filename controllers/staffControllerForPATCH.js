const Staff = require("../Models/staff")

exports.patchV1= async (req, res, next) => {
    try {
        const { id  } = req.body
        const staff = await Staff.updateOne({_id:id }, {
            $set: req.body  //update anyfiled ค่าไหนไม่เอามาด้วย จะใช้ค่าเดิม
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