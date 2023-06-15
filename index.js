const fastify = require('fastify');
const server = fastify({ logger: true });

server.register(require('@fastify/formbody'));

// Swagger
server.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
        info: { title: 'fastify-api'},
    },
    exposeRoute: true,
});

// Routes
const productsRoutes = require('./routes/productsRoutes');
server.register(productsRoutes, { prefix: '/products' });

server.listen({
    port: process.env.PORT || 5000,
});