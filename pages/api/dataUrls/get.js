import _ from 'lodash';
import { apiHandler } from 'middlewares';
import { DataUrlsRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';

// export default apiHandler(handler);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '600mb',
    },
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getData();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getData() {
    console.log(`/api/dataUrls/get`);

    const { hash } = req.query;
    let data = await DataUrlsRepo.getData(hash);

    return res.status(200).json({ status: 'ok', data });
  }
}
