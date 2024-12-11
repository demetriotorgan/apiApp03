const mongoose = require('mongoose')

const PagamentoSchema = new mongoose.Schema({
    data:{
        type:Date
    },
    valor:{
        type:Number
    },
    tipo:{
        type:String
    }
})

const VendaSchema = new mongoose.Schema({
    cliente:{
        type:String
    },
    data:{
        type:Date
    },
    valor:{
        type:Number
    },
    parcelas:{
        type:String
    },
    formapagamento:{
        type:String
    },
    produtos:{
        type:Array
    },
    pagamentos:{
        type:[PagamentoSchema]
    },
},{timestamps:true}); //Vendas mais recentes

module.exports =  mongoose.model('venda', VendaSchema);