const {Router} = require('express');
const { getProdutos, saveProduto, deleteProduto } = require('../controllers/estoqueControler');

const router = Router();

router.get('/produtos', getProdutos);
router.post('/produtos', saveProduto);
router.post('/produtos/delete', deleteProduto);

module.exports = router;