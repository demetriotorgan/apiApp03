const vendaModel = require('../models/vendaModel')

module.exports.getVenda = async(req,res)=>{
    const vendas = await vendaModel.find()
    res.send(vendas);
}

module.exports.saveVenda = async(req,res)=>{
    const {cliente,data,valor, parcelas, formapagamento, produtos, pagamentos} = req.body;
        vendaModel
            .create({cliente,data,valor, parcelas, formapagamento, produtos, pagamentos})
            .then((data)=>{
                console.log('Venda Cadastrada com sucesso');
                console.log(data);
                res.send(data);
            })
}