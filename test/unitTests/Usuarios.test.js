const { describe, it, before, afterEach } = require('mocha');

const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');

const usuarioDatabase = join(__dirname, './../../database', 'usuarios.json');

const mocks = {
  validUsuario: require('./mocks/valid-usuario.json'),
}
