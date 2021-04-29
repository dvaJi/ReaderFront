import userParams from '@shared/params/user';
import { getLatestToken } from '../modules/user/resolvers';

export const AUTH_ERROR = {
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  OPERATION_DENIED: 'OPERATION_DENIED'
};

export const hasPermission = async (mod = 'read', auth, module = 'core') => {
  if (mod !== 'read') {
    const token = await getLatestToken(auth.user.id);
    if (!token) {
      throw new Error(AUTH_ERROR.SESSION_EXPIRED);
    }
  }

  if (auth.user && (module === 'users' || module === 'registry')) {
    return auth.user.role === userParams.roles.admin;
  }

  if (auth.user && auth.user.role) {
    return (
      auth.user.role === userParams.roles.admin ||
      (auth.user.role === userParams.roles.uploader && mod !== 'delete')
    );
  }

  return false;
};
