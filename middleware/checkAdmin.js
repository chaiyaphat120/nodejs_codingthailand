module.exports.isAdmin = (req, res, next) => {
    const { role } = req.user
    if (role === 'Admin') {
        next() //ให้ไปต่อได้
    } else {
        //403 = ไม่มีสิทธิ์
        return res.status(403).json({
            error: {
                message: 'ไม่มีสิทธิ์ใช้งานส่วนนี้ เฉาพะผู้ดูแลระบบ เท่านั้น',
            },
        })
    }
}
