const { describe, it, before, afterEach } = require('mocha');
const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');
const UsuarioService = require("../../api/services/usuarioService");
const database = require('../../api/models');

const usuarioDatabase = join(__dirname, './../DB', 'usuarios.json');

const mocks = {
  validUsuario: require('./../mock/valid-usuario.json'),
};

const autenticar = sinon.stub().returns(true)

describe('UsuarioService Suite Tests', () => {
  let usuarioService = {};
  let sandbox = {};

  before(() => {
    usuarioService = new UsuarioService();
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should add a new user to the database', async () => {
    const newUser = mocks.validUsuario;
    const hashStub = sandbox.stub().resolves(newUser.senha);
    sandbox.stub(database.usuarios, 'findOne').resolves(null);
    sandbox.stub(database.usuarios, 'create').resolves(newUser);
    sandbox.stub(usuarioService, 'hash').returns({ hash: hashStub });

    const result = await usuarioService.cadastrar(newUser);

    expect(database.usuarios.findOne.calledOnceWith({ where: { email: newUser.email } })).to.be.true;
    expect(usuarioService.hash.calledOnceWith(newUser.senha, 8)).to.be.true;
    expect(database.usuarios.create.calledOnceWith({
      id: newUser.id,
      nome: newUser.nome,
      email: newUser.email,
      senha: newUser.senha,
    })).to.be.true;
    expect(result).to.deep.equal(newUser);
  });

  it('should throw an error if user is already registered', async () => {
    const newUser = mocks.validUsuario;
    sandbox.stub(database.usuarios, 'findOne').resolves(newUser);

    try {
      await usuarioService.cadastrar(newUser);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('Usuário já cadastrado');
    }
  });

  it('should return all users from the database', async () => {
    const users = [mocks.validUsuario, mocks.validUsuario];
    sandbox.stub(database.usuarios, 'findAll').resolves(users);

    const result = await usuarioService.buscarTodosUsuarios();

    expect(database.usuarios.findAll.calledOnce).to.be.true;
    expect(result).to.deep.equal(users);
  });

  it('should return a user by ID', async () => {
    const userId = '123456789';
    const user = mocks.validUsuario;
    sandbox.stub(database.usuarios, 'findOne').resolves(user);

    const result = await usuarioService.buscarUsuarioPorId(userId);

    expect(database.usuarios.findOne.calledOnceWith({ where: { id: userId } })).to.be.true;
    expect(result).to.deep.equal(user);
  });

  it('should throw an error if user is not found by ID', async () => {
    const userId = '123456789';
    sandbox.stub(database.usuarios, 'findOne').resolves(null);

    try {
      await usuarioService.buscarUsuarioPorId(userId);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('Usuario informado não cadastrado!');
    }
  });

  it('should update a user', async () => {
    const userId = '123456789';
    const updatedUser = { ...mocks.validUsuario, nome: 'Roberto Champlin IV' };
    const findOneStub = sandbox.stub(database.usuarios, 'findOne').resolves(updatedUser);
    const saveStub = sandbox.stub(updatedUser, 'save').resolves(updatedUser);

    const result = await usuarioService.editarUsuario({ id: userId, nome: 'Joe wich' });

    expect(findOneStub.calledOnceWith({ where: { id: userId } })).to.be.true;
    expect(updatedUser.nome).to.equal('joe wich');
    expect(updatedUser.email).to.equal(mocks.validUsuario.email);
    expect(saveStub.calledOnce).to.be.true;
    expect(result).to.deep.equal(updatedUser);
  });

  it('should throw an error when updating a non-existing user', async () => {
    const userId = '123456789';
    sandbox.stub(database.usuarios, 'findOne').resolves(null);

    try {
      await usuarioService.editarUsuario({ id: userId, nome: 'John Doe' });
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('Erro ao editar usuário!');
    }
  });

  it('should delete a user', async () => {
    const userId = '123456789';
    const findOneStub = sandbox.stub(database.usuarios, 'findOne').resolves(mocks.validUsuario);
    const destroyStub = sandbox.stub(database.usuarios, 'destroy');

    await usuarioService.deletarUsuario(userId);

    expect(findOneStub.calledOnceWith({ where: { id: userId } })).to.be.true;
    expect(destroyStub.calledOnceWith({ where: { id: userId } })).to.be.true;
  });

  it('should throw an error when deleting a non-existing user', async () => {
    const userId = '123456789';
    sandbox.stub(database.usuarios, 'findOne').resolves(null);

    try {
      await usuarioService.deletarUsuario(userId);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error.message).to.equal('Erro ao tentar deletar o usuário!');
    }
  });
});
