const estoqueModel = require('../models/estoqueModel')
const condicionalModel = require('../models/condicionalModel')

module.exports.getCondiconais = async(req,res)=>{
    const condicionais = await condicionalModel.find();
    res.send(condicionais);
}

module.exports.saveCondicional = async(req,res)=>{
    const {cliente, data, produtos} = req.body;
        condicionalModel
            .create({cliente, data, produtos})
            .then((data)=>{
                console.log('Condiconal cadastrado com sucesso')
                console.log(data)
                res.send(data);
            })
}

module.exports.condicionalEntrada = async(req,res)=>{
 const {produtos} = req.body

 if(!Array.isArray(produtos) || produtos.length === 0){
    return res.status(400).send('Lista de produtos inválida ou vazia');
 }

 try {
    const updates = produtos.map(produto =>
        estoqueModel.findByIdAndUpdate(produto._id, {status:"CONDICIONAL"}));
        await Promise.all(updates);
        res.send("Produtos salvos como condicional")
 } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao atualizar condiconais")
 }
}

module.exports.deleteCondicional = async(req,res)=>{
 const {_id} = req.body;
    condicionalModel
        .findByIdAndDelete(_id)
        .then(()=> res.send('Condiconal excluido com sucesso'))
        .catch((err)=>console.log(err));
}