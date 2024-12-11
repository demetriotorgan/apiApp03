const vendaModel = require('../models/vendaModel');
const pagamentosModel = require('../models/pagamentosModel');

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

module.exports.updatePagamento = async(req,res)=>{
    try {
        const {vendaId, pagamentoId} = req.params;
        const {novoPagamento} = req.body; //Dados da Atualização

        //Verifica se os dados são validos
        if(!novoPagamento){
            return res.status(400).json({erro:'Dados de atualização inválidos'})
        }
        //Encontra a venda por ID e atualiza o pagamento
        const vendaAtualizada = await vendaModel.findOneAndUpdate(
            {_id: vendaId, "pagamentos._id":pagamentoId}, //critério da busca
            {$set: {"pagamentos.$":novoPagamento}},//Atualiza o pagamento encontrado
            {new:true} //Retorna o documento atualizado
        );
        //Verifica se a venda foi atualizada
        if(!vendaAtualizada){
            return res.status(400).json({erro:'Venda ou pagamento não encontrados'});            
        }
        res.status(200).json({message:'Pagamento atualizado com sucesso',venda:vendaAtualizada})
    } catch (error) {
        res.status(500).json({erro:'Erro ao atualizar pagamento'});
    }
}

module.exports.listaPagamentos = async(req,res)=>{
    const {cliente, data, valor, tipo, produtos} = req.body;
        try {
            pagamentosModel
                .create({cliente, data, valor, tipo, produtos})
                .then((data)=>{
                    console.log('Pagamento listado com sucesso', data);
                    res.send(data);
                })
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
}