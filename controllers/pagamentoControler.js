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

module.exports.deletePagamento = async(req,res)=>{
    try {
        const {vendaId, pagamentoId} = req.params;
        //Encontra a venda pelo id e remove 
        const vendaAtualizada =  await vendaModel.findByIdAndUpdate(
            vendaId,
            {$pull: {pagamentos:{_id:pagamentoId}}},
            {new:true}//Retorna o documento atualizado
        );
        //Verifica se venda foi encontrada
        if(!vendaAtualizada){
            return res.status(400).json({erro:'Venda não encontrada'});
        }
        res.status(200).json({message:'Pagamento removido com sucesso', venda:vendaAtualizada});     
    } catch (error) {
        res.status(500).json({erro:'Erro ao remover pagamento'});
    }
}