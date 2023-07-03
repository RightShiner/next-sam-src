import { apiHandler } from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { MemoRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await getMemo();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getMemo() {
    console.log(`/api/memo`);

    const { data } = req.body;
    let memo = await MemoRepo.getMemo(data);
    return res.status(200).json({ status: 'ok', data: memo });
  }
}
