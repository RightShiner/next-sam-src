import { apiHandler } from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { MemoRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await saveMemo();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function saveMemo() {
    console.log(`/api/memo/save`);

    const { data } = req.body;
    await MemoRepo.setMemo(data);
    return res.status(200).json({status: 'ok'});
  }
}
