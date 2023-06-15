const mongoose = require('../db/conn');
const { Schema } = require('mongoose');

const Product = mongoose.model(
    'Product',
    new Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
    }, {timestamps: true}),
);

module.exports = Product;