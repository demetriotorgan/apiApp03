const {Router} = require('express');
const { getProdutos, saveProduto } = require('../controllers/estoqueControler');

const router = Router();

router.get('/produtos', getProdutos);
router.post('/produtos', saveProduto);

module.exports = router;