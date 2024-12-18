const {Router} = require('express');
const { getProdutos, saveProduto, deleteProduto, updateProduto } = require('../controllers/estoqueControler');
const { saveVenda, getVenda, deleteVenda, updateProdutoVendido, getPagamentosPorMes, updateVenda, devolucaoProdutos, ultimasVendas } = require('../controllers/vendaControler');
const { addPagamento, deletePagamento, updatePagamento, getListaPagamentos, addPagamentoNaLista, deletePagamentoDaLista, updatePagamentoNaLista, ultimosPagamentos } = require('../controllers/pagamentoControler');
const { getCondiconais, saveCondicional, condicionalEntrada, deleteCondicional, updateCondicional, ultimosCondicionais } = require('../controllers/condicionalControler');


const router = Router();

//estoque
router.get('/produtos', getProdutos);
router.post('/produtos', saveProduto);
router.post('/produtos/delete', deleteProduto);
router.post('/produtos/update', updateProduto);

//venda
router.get('/produtos/venda', getVenda);
router.post('/produtos/venda/save', saveVenda);
router.delete('/produtos/venda/:vendaId', deleteVenda);
router.put('/produtos/venda', updateProdutoVendido);
router.get('/produtos/venda/busca', getPagamentosPorMes);
router.post('/produtos/venda/update', updateVenda);
router.put('/produtos/venda/devolucao', devolucaoProdutos);
router.get('/produtos/venda/recentes', ultimasVendas);

//pagamentos
router.put('/produtos/venda/:id/pagamentos', addPagamento);
router.delete('/produtos/venda/:vendaId/pagamentos/:pagamentoId', deletePagamento);
router.put('/produtos/venda/:vendaId/pagamentos/:pagamentoId', updatePagamento);
router.post('/produtos/venda/pagamentos', addPagamentoNaLista);
router.get('/produtos/venda/pagamentos/lista', getListaPagamentos);
router.post('/produtos/venda/pagamentos/lista/delete', deletePagamentoDaLista);
router.post('/produtos/venda/pagamentos/lista/update', updatePagamentoNaLista);
router.get('/produtos/venda/pagamentos/recentes', ultimosPagamentos);

//condicional
router.get('/produtos/venda/condicional', getCondiconais);
router.post('/produtos/venda/condicional/save', saveCondicional);
router.put('/produtos/venda/condicional/entrada', condicionalEntrada);
router.post('/produtos/venda/condicional/delete', deleteCondicional);
router.put('/produtos/venda/condicional/update', updateCondicional);
router.get('/produtos/venda/condicional/recentes', ultimosCondicionais);
module.exports = router;