const vendaModel = require('../models/vendaModel')

module.exports.addPagamento = async(req,res)=>{
    try {
        const vendaId = req.params.id;
        const novoPagamento = req.body.pagamentos

        const vendaAtualizada = await vendaModel.findByIdAndUpdate(
            vendaId,
            {$push:{pagamentos:{$each: novoPagamento}}},
            {new:true}
        );

        if(!vendaAtualizada){
            return res.status(404).json({erro: 'Venda não encontrada'});
        }
        res.status(200).json({message:'Pagamento adicionado com sucesso', venda: vendaAtualizada});
    } catch (error) {
        res.status(500).json({message:'Erro ao inserir pagamento'});
    }
}