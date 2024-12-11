const mongoose = require('mongoose')

const ListaPagamentosSchema = new mongoose.Schema({
    cliente:{
        type:String
    },
    data:{
        type:Date
    },    
    valor:{
        type:Number
    },
    tipo:{
        type:String
    },
    produtos:{
        type:Array
    }
});

module.exports = mongoose.model('pagamentos', ListaPagamentosSchema);