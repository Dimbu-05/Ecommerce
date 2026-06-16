const express = require('express')
const router = express.Router();
const {getProduct,createProduct,bulkCreate,updateProduct,deleteProduct}=require('../Controllers/productController')


router.get('/',getProduct)
router.post('/',createProduct)
router.post('/bulk',bulkCreate)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)

module.exports = router;