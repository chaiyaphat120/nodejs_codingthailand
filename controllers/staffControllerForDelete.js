const Staff = require("../Models/staff")

exports.deleteV1 = async (req, res, next) => {
    try {
        const { id } = req.params
        const staff = await Staff.deleteOne({ _id: id })
        if (staff.deletedCount === 0) {
            throw new Error("delete fail ไม่พบ user ที่ต้องการลบ")
        }
        res.status(200).json({
            message: "delete complete",
        })
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                errors: [
                    {
                        msg: "User not found",
                        status: "404",
                    },
                ],
            })
        }
        res.status(400).json({
            error: {
                mesaage: "เกิดข้อผิดพลาด " + error.message,
            },
        })
    }
}

exports.deleteV2 = async (req, res, next) => {
    try {
        const { id } = req.params
        const staff = await Staff.findByIdAndDelete(id)
        console.log(staff)
        if (!staff) {
            throw new Error("delete fail ไม่พบ user ที่ต้องการลบ")
        }
        res.status(200).json({
            message: "delete complete",
        })
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                errors: [
                    {
                        msg: "User not found",
                        status: "404",
                    },
                ],
            })
        }
        res.status(400).json({
            error: {
                mesaage: "เกิดข้อผิดพลาด " + error.message,
            },
        })
    }
}
