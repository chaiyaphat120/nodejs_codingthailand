const Staff = require("../Models/staff")


exports.dddDataV1 = async (req, res, next) => {
    try {
        const { name, salary ,tel } = req.body
        console.log(name , salary)
        const staff = new Staff(req.body)
        await staff.save()
        res.status(200).json({
            data: {
                name,
                salary,
                tel
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
        const { name, salary  ,tel} = req.body
        const staff = new Staff({
            name: name,
            salary: salary,
            tel
        })
        await staff.save()
        console.log(staff)
        res.status(200).json({
            data: {
                name,
                salary,
                tel
            },
        })
    } catch (error) {
        res.status(400).json({
            data: error.message,
        })
    }
}

