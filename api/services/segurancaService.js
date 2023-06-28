const database = require("../models");
const Sequelize = require("sequelize");

class SegurancaService {
  async cadastrarAcl(dto) {
    const usuario = await database.usuario.findOne({
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissao,
          as: "usuario_permissao",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.usuarioId,
      },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado");
    }

    const rolesCadastradas = await database.roles.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.roles,
        },
      },
    });

    const permissoescadastradas = await database.permissao.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    await usuario.removeUsuario_roles(usuario.usuario_roles);
    await usuario.removeUsuario_permissoes(usuario.usuario_permissoes);

    await usuario.addUsuario_roles(rolesCadastradas);
    await usuario.addUsuario_permissoes(permissoescadastradas);

    const novoUsuario = await database.usuario.findOne({
      include: [
        {
          model: database.roles,
          as: "usuario_roles",
          attributes: ["id", "nome", "descricao"],
        },
        {
          model: database.permissao,
          as: "usuario_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });

    return novoUsuario;
  }

  async cadastrarPermissoesRoles(dto) {
    const role = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
    });

    if (!role) {
      throw new Error("Role não encontrada");
    }

    const permissoesCadastradas = await database.permissoes.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: dto.permissoes,
        },
      },
    });

    await role.removeRoles_das_permissoes(role.roles_das_permissoes);

    await role.addRoles_das_permissoes(permissoesCadastradas);

    const novaRole = await database.roles.findOne({
      include: [
        {
          model: database.permissoes,
          as: "roles_das_permissoes",
          attributes: ["id", "nome", "descricao"],
        },
      ],
      where: {
        id: dto.roleId,
      },
    });

    return novaRole;
  }
}
module.exports = SegurancaService;
