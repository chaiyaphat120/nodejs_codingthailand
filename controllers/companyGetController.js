const Company = require('../Models/company')


//find
exports.find_v1 = async (req,res,next) =>{
    //เรียกข้อมูลของคนที่ชื่อขึ้นต้นว่า Som ex Somchai  , Sompoi , Somma
    const data = await Company.find({fullname:/^Som/})
    res.status(200).json({
        data
    })
}

exports.find_v2 = async (req,res,next) =>{
    // หาคนที่อยู่ใน buildind A
    // found
    const data = await Company.find({"address.address_text":/^Building A/})
    res.status(200).json({
        data
    })


}

exports.find_v3 = async (req,res,next) =>{
    const data = await Company.find({"address.tel":{$elemMatch:{number : "099888777"}}})   //$elemMatch หาของที่อยู่ใน array
    if(!data){
        res.status(404).json({
            message : "Not found data"
        })
        return 
    }
    res.status(200).json({
        data
    })
}

// notfound  จะ return null
exports.find_v4 = async (req,res,next) =>{
    const data = await Company.find({"address.address_text":/^Building 123A /})
    if(!data){
        res.status(404).json({
            message : "Not found data"
        })
        return 
    }
    res.status(200).json({
        data
    })
}



//findOne
exports.findOne_v1= async (req,res,next) =>{
    //เรียกข้อมูลของคนที่ชื่อขึ้นต้นว่า Som ex Somchai  , Sompoi , Somma
    const data = await Company.findOne({fullname:/^Som/})
    if(!data){
        res.status(404).json({
            message : "Not found data"
        })
        return 
    }
    res.status(200).json({
        data
    })
}

//findOne
exports.findOne_v2= async (req,res,next) =>{
    //เรียกข้อมูลของคนที่ชื่อขึ้นต้นว่า Som ex Somchai  , Sompoi , Somma
    const data = await Company.findOne({fullname:/^Soerer22m/})
    if(!data){
        res.status(404).json({
            message : "Not found data"
        })
        return 
    }
    res.status(200).json({
        data
    })
}


//findByID
exports.findbyID= async (req,res,next) =>{
    //ค้นหาจาก ID
    const data = await Company.findById("5ff91e317be26f1e5c519c54")
    if(!data){
        res.status(404).json({
            message : "Not found data"
        })
        return 
    }
    res.status(200).json({
        data
    })
}