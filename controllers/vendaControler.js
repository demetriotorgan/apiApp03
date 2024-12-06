const estoqueModel = require('../models/estoqueModel');
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

module.exports.deleteVenda =  async(req,res)=>{
    try {
        const {vendaId} = req.params
        const vendaRemovida = await vendaModel.findByIdAndDelete(vendaId);

        //Se a venda foi removida
        if(!vendaRemovida){
            return res.status(404).json({erro: 'Venda não encontrada'});
        }
        res.status(200).json({message: 'Venda removida com sucesso', venda: vendaRemovida});
    } catch (error) {
        res.status(500).json({erro:'Erro ao remover venda'});
    }   
}

module.exports.updateProdutoVendido = async(req,res)=>{
    const {produtos} = req.body; // Lista de produtos no corpo da requisição

    if(!Array.isArray(produtos) || produtos.length === 0){
        return res.status(400).send("A lista de produtos é inválida ou vazia");
    }
    try {
        const updates = produtos.map(produto => 
            estoqueModel.findByIdAndUpdate(produto._id, {status: "VENDIDO"}));
        await Promise.all(updates); //Aguarda todas as atualizações
        res.send("Produtos atualizados")
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao atulizar produtos na venda")
    }    
}