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

//---------------Lista de Pagamentos ------------------//

module.exports.addPagamentoNaLista = async(req,res)=>{
    const {vendaid,cliente, data, valor, tipo, produtos} = req.body;
        try {
            pagamentosModel
                .create({vendaid,cliente, data, valor, tipo, produtos})
                .then((data)=>{
                    console.log('Pagamento listado com sucesso', data);
                    res.send(data);
                })
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
}

module.exports.getListaPagamentos = async(req,res)=>{
    try {
        const listaPagamentos = await pagamentosModel.find()
        res.send(listaPagamentos)    
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }    
}

module.exports.deletePagamentoDaLista = async(req,res)=>{
    try {
        const {_id} = req.body;
            pagamentosModel
                .findByIdAndDelete(_id)
                .then(()=>res.send('Pagamento excluido da lista'))
    } catch (error) {
        console.log(error);
    }
}

module.exports.updatePagamentoNaLista = async(req,res)=>{
    const {vendaid, cliente, data, valor, tipo, produtos} = req.body;
        try {
            const updatePagamento = await pagamentosModel.findOneAndUpdate(
                {vendaid}, //Filtro: Busca pelo id da venda relacionada
                {cliente, data, valor, tipo, produtos}, //Dados da atualização
                {new: true} //Retorna o documento atualizado
            );
            if(!updatePagamento){
                return res.status(400).send('Pagamento não encontrado')
            }
            res.send('Pagamento atualizado na lista')
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao atualizar pagamento na lista')
        }
}

module.exports.ultimosPagamentos = async(req,res)=>{
    try {
        //Busca os 4 ultimos registros em ordem cronologica
        const ultimosPagamentos = await pagamentosModel
            .find()
            .sort({createdAt: -1}) // criação mais recente
            .limit(4)
        res.json(ultimosPagamentos);
    } catch (error) {
        console.error(error)
        res.status(500).send('Erro ao buscar pagamentos')
    }
}