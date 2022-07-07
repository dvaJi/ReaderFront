import models from '../../setup/models';
import { hasPermission } from '../../setup/auth-utils';

export const REGISTRY_ACTIONS = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  BAN: 'ban'
};

export async function getRegistries(_, { first = 50, offset = 0 }, { auth }) {
  if (await hasPermission('read', auth, 'registry')) {
    const registries = await models.Registry.findAll({
      offset,
      limit: first,
      include: [{ model: models.User, as: 'user', attributes: ['name'] }],
      order: [['id', 'DESC']]
    });

    return registries.map(r => ({
      ...r.get({ plain: true }),
      username: r.get({ plain: true }).user.name
    }));
  } else {
    throw new Error('Operation denied.');
  }
}

/**
 * Insert a new registry.
 * @param {number} userId user that made the action.
 * @param {string} action action can be create, update, deleted, ban
 * @param {string} module module
 * @param {string} detail detail of the action.
 */
export async function addRegistry(userId, action, module, detail) {
  try {
    return await models.Registry.create({
      userId,
      action,
      module,
      detail
    });
  } catch (err) {
    console.error(err);
    return {};
  }
}
