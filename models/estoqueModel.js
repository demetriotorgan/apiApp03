const mongoose = require('mongoose');

const EstoqueSchema = new mongoose.Schema({
    codigo:{
        type:String,
        unique:true
    },
    descricao:{
        type:String
    },
    grade:{
        type:String
    },
    pc:{
        type:Number
    },
    pv:{
        type:Number
    },
    dataentrada:{
        type:Date
    },
    status:{
        type:String
    }
})

module.exports = mongoose.model('estoque', EstoqueSchema);