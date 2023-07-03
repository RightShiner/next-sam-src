import { withIronSession } from 'next-iron-session';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
import dbConnect from 'middlewares/mongodb-handler';

export { withSession };

function withSession(handler) {
  dbConnect();
  // if (process.env.NEXT_PUBLIC_REGION == 'SG') {
  //   modashService
  //     .getLanguages('instagram')
  //     .then((response) => {})
  //     .catch((msg) => {
  //       toast.error(msg);
  //     });
  // }

  return withIronSession(handler, {
    password: serverRuntimeConfig.secret,
    cookieName: serverRuntimeConfig.cookie,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production' ? false : false,
    },
  });
}
