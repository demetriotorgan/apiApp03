const {Router} = require('express');
const { getProdutos, saveProduto, deleteProduto, updateProduto } = require('../controllers/estoqueControler');
const { saveVenda, getVenda, deleteVenda, updateProdutoVendido } = require('../controllers/vendaControler');
const { addPagamento, deletePagamento, updatePagamento } = require('../controllers/pagamentoControler');

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

//pagamentos
router.put('/produtos/venda/:id/pagamentos', addPagamento);
router.delete('/produtos/venda/:vendaId/pagamentos/:pagamentoId', deletePagamento);
router.put('/produtos/venda/:vendaId/pagamentos/:pagamentoId', updatePagamento);

module.exports = router;