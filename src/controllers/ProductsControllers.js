const Product = require('../models/Product');
const mongoose = require('mongoose');

const createProduct = async (req, reply) => {
    const { name, price, description } = req.body;

    // Validations
    if (!name) {
        reply.code(422).send({ message: 'O nome é obrigatório, por favor tente novamente!' });
        return;
    };
    if (!price) {
        reply.code(422).send({ message: 'O preço é obrigatório, por favor tente novamente!' });
        return;
    };
    if (!description) {
        reply.code(422).send({ message: 'A descrição é obrigatória, por favor tente novamente!' });
        return;
    };
    const product = new Product({
        name,
        price,
        description
    });

    try {
        await product.save();
        reply.code(201).send({ message: 'Produto criado com sucesso!' });
    } catch (error) {
        console.error('Deu erro na hora de criar o produto: ' + error);
        reply.code(500).send({ message: error });
        return;
    };
};

const getAllProducts = async (req, reply) => {
    const products = await Product.find();
    reply.code(200).send(products);
};

const getProductById = async (req, reply) => {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id });
    if (!product) {
        reply.code(404).send({ message: 'Produto não encontrado! ' });
        return;
    };
    reply.code(200).send({ product });
};

const updateProductById = async (req, reply) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const product = await Product.findOne({ _id: id });
    if (!product) {
        reply.code(404).send({ message: 'Pet não encontrado! ' });
        return;
    };

    const newProduct = {
        name,
        price,
        description
    };

    try {
        await Product.findByIdAndUpdate(id, newProduct);
    } catch (error) {
        console.error('Deu erro na hora de atualizar o produto: ' + error);
        reply.code(500).send({ message: error });
        return;
    };
    reply.code(200).send({ message: 'Produto atualizado com sucesso!' });
};

const deleteProductById = async (req, reply) => {
    const { id } = req.params;

    // Check if ID is Valid
    if (!mongoose.isValidObjectId(id)) {
        reply.code(422).send({ message: 'ID inválido!' });
        return;
    };

    // Check is ID Exists in DB
    const product = await Product.findOne({ _id: id });
    if (!product) {
        reply.code(404).send({ message: 'Produto não encontrado ou inexistente!' });
        return;
    };

    await Product.findByIdAndDelete(id);
    reply.code(200).send({ message: 'Produto deletado com sucesso!' });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};