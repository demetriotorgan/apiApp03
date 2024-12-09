const mongoose = require('mongoose')

const condicionalSchema = new mongoose.Schema({
    cliente:{
        type:String
    },
    data:{
        type:Date
    },
    produtos:{
        type:Array
    }
})

module.exports = mongoose.model('condicional', condicionalSchema);