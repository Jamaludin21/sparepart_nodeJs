const crypto = require('crypto')
const environment = process.env.NODE_ENV || 'production';
const configuration = require('../knex')[environment];
const database = require('knex')(configuration);

const findAllproduct = () => {
    return database.raw("SELECT * FROM master_barang ORDER BY nama_barang ASC")
        .then((data) => data.rows)
}

const findproduct = (getparams) => {
    return database.raw("SELECT * FROM master_barang WHERE kode_barang = ?", [getparams.kode_barang])
        .then((data) => data.rows[0])
}

const findproduct_category = (getparams) => {
    return database.raw("SELECT * FROM master_barang WHERE kategori = ? ORDER BY product_name ASC", [getparams.kategori])
        .then((data) => data.rows)
}

const createProduct = (product) => {
    const id = "Product-" + crypto.randomUUID();
    console.log(id);
    return database.raw(
            "INSERT INTO master_barang(kode_barang, nama_barang, harga_jual, harga_beli, satuan, kategori) VALUES (?, ?, ?, ?, ?, ?) RETURNING kode_barang, nama_barang, harga_jual, harga_beli, satuan, kategori", [id, product.nama_barang, product.harga_jual, product.harga_beli, product.satuan, product.kategori])
        .then((data) => data.rows[0])
}

const updateProduct = (req) => {
    const getparams = req.params
    const product = req.body
    return database.raw(
            "UPDATE master_barang SET nama_barang = ?,harga_jual = ?,harga_beli = ?, satuan = ?,kategori = ? WHERE kode_barang = ? RETURNING kode_barang, nama_barang, harga_jual, harga_beli, satuan, kategori", [product.nama_barang, product.harga_jual, product.harga_beli, product.satuan, product.kategori, getparams.kode_barang]
        )
        .then((data) => data.rows[0])
}

const deleteProduct = (getparams) => {
    return database.raw(
            "DELETE FROM master_barang WHERE kode_barang = ?", [getparams.kode_barang]
        )
        .then((data) => data.rows[0])
}
module.exports = {
    findAllproduct,
    findproduct,
    findproduct_category,
    createProduct,
    updateProduct,
    deleteProduct
}