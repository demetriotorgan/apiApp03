const {Router} = require('express');
const { getProdutos, saveProduto } = require('../controllers/estoqueControler');

const router = Router();

router.get('/estoque', getProdutos);
router.post('/estoque', saveProduto);

module.exports = router;