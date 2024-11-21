const estoqueModel = require('../models/estoqueModel');

module.exports.getProdutos = async(req,res)=>{
    const produtos = await estoqueModel.find()
    res.send(produtos)
}

module.exports.saveProduto = async(req,res)=>{
    const {codigo, descricao, grande, pc, pv, dataentrada, status} = req.body
    estoqueModel
        .create({codigo, descricao, grande, pc, pv, dataentrada, status})
        .then((data)=>{
            console.log('Produto cadastrado com sucesso')
            console.log(data)
            res.send(data)
        })        
}