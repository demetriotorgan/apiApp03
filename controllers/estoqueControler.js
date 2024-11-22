const estoqueModel = require('../models/estoqueModel');

module.exports.getProdutos = async(req,res)=>{
    const produtos = await estoqueModel.find()
    res.send(produtos)
}

module.exports.saveProduto = async(req,res)=>{
    const {codigo, descricao, grade, pc, pv, dataentrada, status} = req.body
    estoqueModel
        .create({codigo, descricao, grande, pc, pv, dataentrada, status})
        .then((data)=>{
            console.log('Produto cadastrado com sucesso')
            console.log(data)
            res.send(data)
        })
        .catch((err)=>{
            console.log(err)
            res.sendStatus(500)
        });        
}

module.exports.deleteProduto = async(req,res)=>{
    const {_id} = req.body
        estoqueModel
            .findByIdAndDelete(_id)
            .then(()=>res.send('Produto deletado com sucesso'))
            .catch((err)=>console.log(err));
}

