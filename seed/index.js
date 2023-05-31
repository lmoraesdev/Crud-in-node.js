const { faker } = require('@faker-js/faker');

const { Usuario } = require('../api/models/usuarios')

const { join } = require('path');
const { writeFile } = require('fs');


const seederBaseFolder = join(__dirname, '../', 'DB');
const ITEMS_AMOUINT = 5;

const usuarios = [];
for (let i = 0; i < ITEMS_AMOUINT; i++) {
    usuarios.push({
        id: faker.string.uuid(),
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        senha: faker.internet.password(),
    })
}

const write = (filename, data) => {
    writeFile(join(seederBaseFolder, filename), JSON.stringify(data), () => { });
}
;(async () => {
    await write('usuarios.json', usuarios);
    console.log('Usuarios', usuarios)
} )();
