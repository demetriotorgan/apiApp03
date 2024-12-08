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

module.exports.getPagamentosPorMes = async(req,res)=>{
    try {
        const {mes, ano} = req.query;

        //Verifica se o mes e o ano foram fornecidos
        if(!mes || !ano){
            return res.status(400).json({erro:'Por favor forneça um mês ou ano válido'});
        }

        const mesInt = parseInt(mes);
        const anoInt = parseInt(ano);

        if(isNaN(mesInt) || isNaN(anoInt) || mesInt < 1 || mesInt > 12){
            return res.status(400).json({erro:'Mês ou ano inválido'});
        }

        //Define o inicio e o fim do mes
        const inicioMes = new Date(anoInt, mesInt -1, 0);
        const fimMes = new Date(anoInt, mesInt, 0);

        //Consulta para encontrar todas as vendas no intervalo definido
        const vendas = await vendaModel.find({
            'pagamentos.data' : {$gte: inicioMes, $lt: fimMes}
        });

        //Filtrando pagamentos
        const resultado = vendas.map(venda=>({
            nome: venda.cliente,
            valor: venda.valor,
            pagamentos: venda.pagamentos.filter(pagamento =>
                pagamento.data >= inicioMes && pagamento.data < fimMes
            )
        })).filter(venda => venda.pagamentos.length > 0);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({erro:'Erro ao buscar pagamentos'});
    }
}

module.exports.updateVenda = async(req,res)=>{
    const {_id, cliente,data,valor, parcelas, formapagamento, produtos, pagamentos} = req.body;
    vendaModel
        .findByIdAndUpdate(_id, {cliente,data,valor, parcelas, formapagamento, produtos, pagamentos})
        .then(()=>res.send('Venda Atualizada com sucesso'))
        .catch((err)=>console.log(err))
}