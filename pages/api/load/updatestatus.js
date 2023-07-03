const jwt = require('jsonwebtoken');
import {apiHandler} from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UpdateRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateStatus();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function updateStatus() {
    console.log(`/api/load/updatestatus`);

    await UpdateRepo.updateHistory(req.body);
    return res.status(200).json({status: 'ok'});
  }
}
