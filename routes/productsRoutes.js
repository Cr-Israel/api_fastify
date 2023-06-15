const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,

} = require('../controllers/ProductsControllers');

// Schema
const Product = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        price: { type: 'string' },
        description: { type: 'string' },
    },
};

const createProductOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'string' },
                description: { type: 'string' },
            },
        },
        reponse: {
            201: Product,
        },
    },
    handler: createProduct,
};

const getAllProductsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                product: Product
            },
        },
    },
    handler: getAllProducts,
};

const getProductByIdOpts = {
    schema: {
        response: {
            201: Product
        },
    },
    handler: getProductById,
};

const updateProductByIdOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'string' },
                description: { type: 'string' },
            },
        },
        reponse: {
            200: Product,
        },
    },
    handler: updateProductById,
};

const deleteProductByIdOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deleteProductById,
};

function productsRoutes(server, opts, done) {
    // Post a Product
    server.post('/', createProductOpts);

    // Get All Products
    server.get('/', getAllProductsOpts);

    // Get a Single Product By ID
    server.get('/:id', getProductByIdOpts);

    // Update a Product
    server.patch('/update/:id', updateProductByIdOpts);

    // Delete a Product
    server.delete('/delete/:id', deleteProductByIdOpts);

    done();
};

module.exports = productsRoutes;