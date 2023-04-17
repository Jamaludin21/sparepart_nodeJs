const express = require('express');
const router = express.Router();

const pengguna = require('../action/pengguna');
const produk = require('../action/produk')



//pengguna api
router.get('/getAllPengguna', pengguna.getAllPengguna)
router.post('/signin', pengguna.signin)

// Produk API
router.get('/getAll_product', produk.getAll_product)
router.get('/get_product/:id', produk.get_product)
router.get('/get_productbyCategory/:product_category', produk.get_productbyCategory)
router.post('/add_product', produk.create_product)
router.patch('/update_product/:kode_barang', produk.update_product)
router.delete('/delete_product/:kode_barang', produk.delete_product)



// Admin & User API
module.exports = router;