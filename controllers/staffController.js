const { json } = require("express")
const Staff = require("../Models/staff")


exports.findV1 = async (req, res, next) => {
    Staff.find()
        .select("_id name salary tel")
        .exec()
        .then((docs) => {
            console.log(docs)
            let count = docs.length
            const response = {
                count: docs.length,
                product: docs.map((doc) => {
                    return {
                        name: doc.name,
                        _id: doc.id,
                        tel:doc.tel,
                        request: {
                            type: "GET",
                            url: `http://localhost:3000/products/${doc._id}`,
                        },
                    }
                }),
            }
            if (count <= 0) {
                res.status(200).json({
                    status: "success",
                    data: response,
                })
            } else {
                res.status(200).json(response)
            }
        })
}

exports.findV2 = async (req, res, next) => {
    const data = await Staff.find().select("-__v") //$elemMatch หาของที่อยู่ใน array
    //ให้เลือกอย่างใเอย่างหนึ่ง ระหว่าง -filed กับ filed ex.select(" -name ")
    const count = data.length
    if (!data) {
        res.status(404).json({
            message: "Not found data",
        })
        return
    }
    res.status(200).json({
        status: "success",
        count: count,
        data,
    })
}

exports.dddDataV1 = async (req, res, next) => {
    try {
        const { name, salary } = req.body
        const staff = new Staff(req.body)
        await staff.save()
        console.log(staff)
        res.status(200).json({
            data: {
                name,
                salary,
            },
        })
    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}

exports.dddDataV2 = async (req, res, next) => {
    try {
        const { name, salary } = req.body
        const staff = new Staff({
            name: name,
            salary: salary,
        })
        await staff.save()
        console.log(staff)
        res.status(200).json({
            data: {
                name,
                salary,
            },
        })
    } catch (error) {
        res.status(400).json({
            data: error.message,
        })
    }
}

//Find Not Found
exports.findNotFound_v1 = async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await Staff.findById(id).select("-__v")
        if (!data) {
            throw new Error("ไม่พบข้อมูลพนักงาน")
        }
        const count = data.length
        res.status(200).json({
            status: "success",
            count: count,
            data,
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
            status: "fail",
            msg: "เกิดข้อผิดพลาด  " + error.message,
        })
    }
}


//delete method