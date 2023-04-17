const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const models = require('../models/produk');


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.urlencoded({
    extended: true,
}));


//action
function getAll_product(req, res) {
    models.findAllproduct()
        .then(foundProduct => {
            console.log(foundProduct)
            res.status(200).json(foundProduct)
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

function get_product(req, res) {
    const getparams = req.params
    models.findproduct(getparams)
        .then(foundProduct => {
            console.log(foundProduct)
            res.status(200).json(foundProduct)
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

function get_productbyCategory(req, res) {
    const getparams = req.params
    models.findproduct_category(getparams)
        .then(foundProduct => {
            console.log(foundProduct)
            res.status(200).json(foundProduct)
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

function create_product(req, res) {
    const product = req.body
    models.createProduct(product)
        .then(Product => {
            console.log(Product)
            res.status(200).json(Product)
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}


function update_product(req, res) {
    const getparams = req.params
    let edit_product
    models.findproduct(getparams)
        .then(foundProduct => {
            edit_product = foundProduct
            console.log(foundProduct)
            if (edit_product) {
                models.updateProduct(req, edit_product)
                    .then(edit_product => {
                        console.log(edit_product)
                        res.status(200).json(edit_product)
                    })
                    .catch((err) => console.error(err))
                    .catch((err) => res.status(500).json({ error: err.message }))
            }
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

function delete_product(req, res) {
    const getparams = req.params
    let erase_product
    models.findproduct(getparams)
        .then(foundProduct => {
            erase_product = foundProduct
            if (erase_product) {
                models.deleteProduct(getparams)
                    .then(() => {
                        console.log("Product has been Deleted!")
                        res.status(200).json("Product has been Deleted!")
                    })
                    .catch((err) => console.error(err))
                    .catch((err) => res.status(500).json({ error: err.message }))
            }
        })
        .catch((err) => console.error(err))
        .catch((err) => res.status(500).json({ error: err.message }))
}

module.exports = {
    getAll_product,
    get_product,
    get_productbyCategory,
    create_product,
    update_product,
    delete_product
}