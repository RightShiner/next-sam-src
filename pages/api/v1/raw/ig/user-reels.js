import { apiHandler } from 'middlewares';

import getConfig from 'next/config';
import { apiWrapper } from 'helpers';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import ReduceCredit from 'constants/reduce_credit';
import { UserRepo } from 'repositories';
const { serverRuntimeConfig } = getConfig();
const baseUrl = `${serverRuntimeConfig.modashUrl}`;

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getReels();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getReels() {
    console.log('/api/v1/raw/ig/user-reels');
    let status = await UserRepo.reduceCredit(
      req.user.id,
      ReduceCredit.raw.user_reels,
    );
    if (status) {
      return apiWrapper
        .get(`${baseUrl}/raw/ig/user-reels`, req.query)
        .then((response) => {
          response?.items?.length > 0 &&
            response.items[0].hasOwnProperty('media') &&
            response.items.forEach((item, index) => {
              this[index] = { ...item.media };
            });
          return res.status(200).json(response);
        })
        .catch((e) => {
          return res
            .status(Constants.errors.badrequest)
            .json({ message: Lang.communcation_errs.e005 });
        });
    } else {
      return res.status(Constants.errors.badrequest).json({
        error: true,
        message: Lang.communcation_errs.e005,
      });
    }
  }
}
