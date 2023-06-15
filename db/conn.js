const mongoose = require('mongoose');
const {
    USER_NAME,
    USER_PASS
} = require('../config');

async function main() {
    await mongoose.connect(`mongodb+srv://${USER_NAME}:${USER_PASS}@getapet.heypw38.mongodb.net/`);
    console.log('Conectado ao Mongoose!');
};

main().catch(error => console.error('Deu erro na conexão com o banco: ' + error));

module.exports = mongoose;