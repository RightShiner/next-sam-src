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
    case 'POST':
      return await addData();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function addData() {
    const { data } = req.body;
    let hash = await DataUrlsRepo.addData(data);

    return res.status(200).json({
      status: 'ok',
      hash,
    });
  }
}
