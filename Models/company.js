const mongoose = require('mongoose')

const scheme  = new mongoose.Schema({
    name : String,
    address : {
        provice : String
    }
},{collation:"companies"})

const company  = mongoose.model('Company' , scheme)
module.exports = company