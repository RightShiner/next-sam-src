const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { UserRepo } from 'repositories';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

async function jwtMiddleware(req, res) {
  if (req.url === '/api/users/authenticate') return true;

  const authHeader = req.headers.authorization;
  if (!authHeader)
    throw {
      status: Constants.errors.unauthorized,
      message: Lang.communcation_errs.e010,
    };

  const token = authHeader.split(' ')[1];
  try {
    const tokenInfo = jwt.verify(token, serverRuntimeConfig.secret);
    if (tokenInfo.exp < tokenInfo.iat)
      throw {
        status: Constants.errors.forbidden,
        message: Lang.communcation_errs.e010,
      };

    // if (process.env.NEXT_PUBLIC_REGION == 'SG') {
    //   const loginAt = await UserRepo.getLoginAt(tokenInfo.user);

    //   if (loginAt !== tokenInfo.loginAt) {
    //     throw {
    //       status: Constants.errors.unauthorized,
    //       message: Lang.communcation_errs.e006,
    //     };
    //   }
    // }

    req.user = { id: tokenInfo.user, role: tokenInfo.role };
  } catch (err) {
    throw {
      status: Constants.errors.unauthorized,
      message: Lang.communcation_errs.e006,
    };
  }

  return true;
}
